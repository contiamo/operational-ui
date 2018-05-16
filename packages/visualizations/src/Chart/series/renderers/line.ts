import { compact, defaults, difference, find, forEach, get, isFinite, isNil, map, sortBy } from "lodash/fp"
import Series from "../series"
import {
  line as d3Line,
  curveCardinal,
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
  curveStep,
  curveStepAfter,
  curveStepBefore,
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
  RendererType,
  SingleRendererOptions,
  SeriesAccessors,
  State,
} from "../../typings"

export type Options = SingleRendererOptions<LineRendererAccessors>

const defaultAccessors: Partial<LineRendererAccessors> = {
  color: (series: Series, d: Datum) => series.legendColor(),
  dashed: (series: Series, d: Datum) => false,
  interpolate: (series: Series, d: Datum) => "linear",
  closeGaps: (series: Series, d: Datum) => true,
}

const interpolator = {
  cardinal: curveCardinal,
  linear: curveLinear,
  monotoneX: curveMonotoneX,
  monotoneY: curveMonotoneY,
  step: curveStep,
  stepAfter: curveStepAfter,
  stepBefore: curveStepBefore,
}

const hasValue = (d: any): boolean => {
  return !!d || d === 0
}

const aOrB = (a: any, b: any): any => {
  return hasValue(a) ? a : b
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
  xScale: any
  y: RendererAccessor<number | Date>
  adjustedY: RendererAccessor<number>
  yScale: any

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
    const accessors: LineRendererAccessors = defaults(defaultAccessors)(customAccessors)
    this.x = (d: Datum): any => aOrB(this.series.x(d), d.injectedX)
    this.y = (d: Datum): any => aOrB(this.series.y(d), d.injectedY)
    this.color = (d?: Datum): string => accessors.color(this.series, d)
    this.dashed = (d?: Datum): boolean => accessors.dashed(this.series, d)
    this.interpolate = (d?: Datum): any => interpolator[accessors.interpolate(this.series, d)]
    this.closeGaps = (d?: Datum): boolean => accessors.closeGaps(this.series, d)
  }

  private setAxisScales(): void {
    this.xIsBaseline = this.state.current.get("computed").axes.baseline === "x"
    this.xScale = this.state.current.get("computed").axes.computed[this.series.xAxis()].scale
    this.yScale = this.state.current.get("computed").axes.computed[this.series.yAxis()].scale
    this.adjustedX = (d: Datum): any => this.xScale(this.xIsBaseline ? this.x(d) : aOrB(d.x1, this.x(d)))
    this.adjustedY = (d: Datum): any => this.yScale(this.xIsBaseline ? aOrB(d.y1, this.y(d)) : this.y(d))
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

  private isDefined(d: Datum): boolean {
    return this.series.options.stacked && this.closeGaps() ? true : hasValue(this.x(d)) && hasValue(this.y(d))
  }

  private startPath(data: Datum[]): string {
    return (d3Line() as any)
      .x(this.xIsBaseline ? this.adjustedX : this.xScale(0))
      .y(this.xIsBaseline ? this.yScale(0) : this.adjustedY)
      .curve(this.interpolate())
      .defined(this.isDefined.bind(this))(data)
  }

  private path(data: Datum[]): string {
    return (d3Line() as any)
      .x(this.adjustedX)
      .y(this.adjustedY)
      .curve(this.interpolate())
      .defined(this.isDefined.bind(this))(data)
  }
}

export default Line
