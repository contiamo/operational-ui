import { compact, defaults, difference, find, forEach, get, isNil, map, sortBy } from "lodash/fp"
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
  RendererClass,
  RendererOptions,
  RendererType,
  SeriesAccessors,
  State
} from "../../typings"

type Options = RendererOptions<LineRendererAccessors>

const defaultAccessors: LineRendererAccessors = {
  x: (series: Series, d: Datum) => d.x,
  y: (series: Series, d: Datum) => d.y,
  color: (series: Series, d: Datum) => series.legendColor(),
  // @TODO implement
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
  quantIsY: boolean
  series: Series
  state: State
  type: RendererType = "line"
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

  appendSeriesGroup(el: D3Selection): D3Selection {
    return el.append("g").attr("class", `series:${this.series.key()} ${styles.line}`)
  }

  update(data: Datum[], options: Options): void {
    this.options = options
    this.assignAccessors(options.accessors)
    this.data = data
  }

  setAxisScales(): void {
    const axisData: AxesData = this.state.current.get("accessors").data.axes(this.state.current.get("data"))
    const axisTypes: AxisType[] = map((axis: AxisPosition): AxisType => axisData[axis].type)([
      this.series.xAxis(),
      this.series.yAxis()
    ])
    if (difference(axisTypes)(["time", "quant"]).length > 0) {
      throw new Error(`The line renderer is incompatible with a ${axisTypes[0]} and a ${axisTypes[1]} axis.`)
    }
    this.xScale = this.state.current.get("computed").axes.computed[this.series.xAxis()].scale
    this.yScale = this.state.current.get("computed").axes.computed[this.series.yAxis()].scale
    this.quantIsY = axisTypes[1] === "quant"
    this.adjustedX = (d: Datum): any => this.xScale(this.quantIsY ? this.x(d) : d.x1 || this.x(d))
    this.adjustedY = (d: Datum): any => this.yScale(this.quantIsY ? d.y1 || this.y(d) : this.y(d))
  }

  assignAccessors(customAccessors: Partial<LineRendererAccessors>): void {
    const accessors: LineRendererAccessors = defaults(defaultAccessors)(customAccessors)
    this.x = (d: Datum): any => accessors.x(this.series, d) || d.injectedX
    this.y = (d: Datum): any => accessors.y(this.series, d) || d.injectedY
    this.color = (d?: Datum): string => accessors.color(this.series, d)
    this.dashed = (d?: Datum): boolean => accessors.dashed(this.series, d)
    this.interpolate = (d?: Datum): any => interpolator[accessors.interpolate(this.series, d)]
    this.closeGaps = (d?: Datum): boolean => accessors.closeGaps(this.series, d)
  }

  dataForAxis(axis: "x" | "y"): any[] {
    const data: any[] = map(get(axis))(this.data)
      .concat(map(get(`${axis}0`))(this.data))
      .concat(map(get(`${axis}1`))(this.data))
    return compact(data)
  }

  addMissingData(): void {
    if (this.closeGaps()) {
      return
    }
    if (this.quantIsY && !this.series.options.stacked) {
      const ticks: Date[] = this.state.current.get("computed").series.dataForAxes[this.series.xAxis()]
      forEach((tick: Date): void => {
        if (!find((d: Datum): boolean => this.x(d).toString() === tick.toString())(this.data)) {
          this.data.push({ injectedX: tick, injectedY: undefined })
        }
      })(ticks)
    }
  }

  startPath(data: Datum[]): string {
    const isDefined = (d: Datum) => !!this.x(d) && !!this.y(d)
    return (d3Line() as any)
      .x(this.quantIsY ? this.adjustedX : this.xScale(0))
      .y(this.adjustedY ? this.yScale(0) : this.adjustedY)
      .curve(this.interpolate())
      .defined(isDefined)(data)
  }

  path(data: Datum[]): string {
    const isDefined = (d: Datum) => !!this.x(d) && !!this.y(d)
    return (d3Line() as any)
      .x(this.adjustedX)
      .y(this.adjustedY)
      .curve(this.interpolate())
      .defined(isDefined)(data)
  }

  draw(): void {
    this.setAxisScales()
    this.addMissingData()

    const data: Datum[] = sortBy((d: Datum): any => (this.quantIsY ? this.x(d) : this.y(d)))(this.data)

    const line = this.el.selectAll("path").data([data])

    line
      .enter()
      .append("svg:path")
      .attr("d", this.startPath.bind(this))
      .attr("class", this.dashed() ? "dashed" : "")
      .style("stroke", this.color.bind(this))
      .merge(line)
      .transition()
      .duration(this.state.current.get("config").duration)
      .attr("d", this.path.bind(this))
      .style("stroke", this.color.bind(this))

    line
      .exit()
      .transition()
      .duration(this.state.current.get("config").duration)
      .attr("d", this.startPath.bind(this))
      .remove()
  }

  close(): void {
    this.el.remove()
  }
}

export default Line
