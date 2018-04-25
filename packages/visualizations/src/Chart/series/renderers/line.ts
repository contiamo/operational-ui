import { compact, defaults, difference, find, forEach, get, isNil, map, merge, sortBy } from "lodash/fp"
import Series from "../series"
import {
  line as d3Line,
  curveCardinal,
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
  curveStep,
  curveStepAfter,
  curveStepBefore
} from "d3-shape"
import * as styles from "./styles"
import {
  LineRendererAccessors,
  AxesData,
  AxisPosition,
  AxisType,
  D3Selection,
  Datum,
  EventBus,
  Partial,
  RendererAccessor,
  RendererAxesAccessors,
  RendererClass,
  RendererOptions,
  RendererType,
  SeriesAccessors,
  State
} from "../../typings"

export type Options = RendererOptions<LineRendererAccessors>

const defaultAccessors: Partial<LineRendererAccessors> = {
  color: (series: Series, d: Datum) => series.legendColor(),
  dashed: (series: Series, d: Datum) => false,
  interpolate: (series: Series, d: Datum) => "linear",
  closeGaps: (series: Series, d: Datum) => true
}

const interpolator = {
  cardinal: curveCardinal,
  linear: curveLinear,
  monotoneX: curveMonotoneX,
  monotoneY: curveMonotoneY,
  step: curveStep,
  stepAfter: curveStepAfter,
  stepBefore: curveStepBefore
}

class Line implements RendererClass<LineRendererAccessors> {
  closeGaps: RendererAccessor<boolean>
  color: RendererAccessor<string>
  dashed: RendererAccessor<boolean>
  data: Datum[]
  el: D3Selection
  events: EventBus
  interpolate: RendererAccessor<any>
  options: Options
  series: Series
  state: State
  type: RendererType = "line"
  xIsBaseline: boolean
  x: RendererAccessor<number | Date>
  adjustedX: RendererAccessor<number>
  xScale: any // @TODO
  y: RendererAccessor<number | Date>
  adjustedY: RendererAccessor<number>
  yScale: any // @TODO

  constructor(state: State, events: EventBus, el: D3Selection, data: Datum[], options: Options, series: Series) {
    this.state = state
    this.events = events
    this.series = series
    this.el = this.appendSeriesGroup(el)
    this.update(data, options)
  }

  // Public methods
  update(data: Datum[], options: Options): void {
    this.options = options
    this.assignAccessors(options.accessors)
    this.data = data
  }

  draw(): void {
    this.setAxisScales()
    this.addMissingData()

    const data: Datum[] = sortBy((d: Datum): any => (this.xIsBaseline ? this.x(d) : this.y(d)))(this.data)
    const duration: number = this.state.current.get("config").duration

    const line = this.el.selectAll("path").data([data])

    line
      .enter()
      .append("svg:path")
      .attr("d", this.startPath.bind(this))
      .merge(line)
      .attr("class", this.dashed() ? "dashed" : "")
      .style("stroke", this.color.bind(this))
      .transition()
      .duration(duration)
      .attr("d", this.path.bind(this))

    line
      .exit()
      .transition()
      .duration(duration)
      .attr("d", this.startPath.bind(this))
      .remove()
  }

  close(): void {
    this.el.remove()
  }

  dataForAxis(axis: "x" | "y"): any[] {
    const data: any[] = map((this as any)[axis])(this.data)
      .concat(map(get(`${axis}0`))(this.data))
      .concat(map(get(`${axis}1`))(this.data))
    return compact(data)
  }

  // Private methods
  private appendSeriesGroup(el: D3Selection): D3Selection {
    return el.append("g").attr("class", `series:${this.series.key()} ${styles.line}`)
  }

  private assignAccessors(customAccessors: Partial<LineRendererAccessors>): void {
    const axisAcessors: RendererAxesAccessors = this.state.current.get("accessors").renderer
    const accessors: LineRendererAccessors = defaults(merge(defaultAccessors)(axisAcessors))(customAccessors)
    this.x = (d: Datum): any => accessors.x(this.series, d) || d.injectedX
    this.y = (d: Datum): any => accessors.y(this.series, d) || d.injectedY
    this.color = (d?: Datum): string => accessors.color(this.series, d)
    this.dashed = (d?: Datum): boolean => accessors.dashed(this.series, d)
    this.interpolate = (d?: Datum): any => interpolator[accessors.interpolate(this.series, d)]
    this.closeGaps = (d?: Datum): boolean => accessors.closeGaps(this.series, d)
  }

  private setAxisScales(): void {
    this.xIsBaseline = this.state.current.get("computed").axes.baseline === "x"
    const axisData: AxesData = this.state.current.get("accessors").data.axes(this.state.current.get("data"))
    const axisTypes: AxisType[] = map((axis: AxisPosition): string => axisData[axis].type)([
      this.series.xAxis(),
      this.series.yAxis()
    ])
    if (difference(axisTypes)(["time", "quant"]).length > 0) {
      throw new Error(`The line renderer is incompatible with a ${axisTypes[0]} and a ${axisTypes[1]} axis.`)
    }
    this.xScale = this.state.current.get("computed").axes.computed[this.series.xAxis()].scale
    this.yScale = this.state.current.get("computed").axes.computed[this.series.yAxis()].scale
    this.adjustedX = (d: Datum): any => this.xScale(this.xIsBaseline ? this.x(d) : d.x1 || this.x(d))
    this.adjustedY = (d: Datum): any => this.yScale(this.xIsBaseline ? d.y1 || this.y(d) : this.y(d))
  }

  private addMissingData(): void {
    if (this.closeGaps()) {
      return
    }
    if (this.xIsBaseline && !this.series.options.stacked) {
      const ticks: Date[] = this.state.current.get("computed").series.dataForAxes[this.series.xAxis()]
      forEach((tick: Date): void => {
        if (!find((d: Datum): boolean => this.x(d).toString() === tick.toString())(this.data)) {
          this.data.push({ injectedX: tick, injectedY: undefined })
        }
      })(ticks)
    }
  }

  private startPath(data: Datum[]): string {
    const isDefined = (d: Datum) => !!this.x(d) && !!this.y(d)
    return (d3Line() as any)
      .x(this.xIsBaseline ? this.adjustedX : this.xScale(0))
      .y(this.xIsBaseline ? this.yScale(0) : this.adjustedY)
      .curve(this.interpolate())
      .defined(isDefined)(data)
  }

  private path(data: Datum[]): string {
    const isDefined = (d: Datum) => !!this.x(d) && !!this.y(d)
    return (d3Line() as any)
      .x(this.adjustedX)
      .y(this.adjustedY)
      .curve(this.interpolate())
      .defined(isDefined)(data)
  }
}

export default Line
