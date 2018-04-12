import { compact, defaults, difference, find, forEach, get, isNil, map, merge, sortBy } from "lodash/fp"
import Series from "../series"
import {
  area as d3Area,
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
  AreaRendererAccessors,
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

type Options = RendererOptions<AreaRendererAccessors>

const interpolator = {
  cardinal: curveCardinal,
  linear: curveLinear,
  monotoneX: curveMonotoneX,
  monotoneY: curveMonotoneY,
  step: curveStep,
  stepAfter: curveStepAfter,
  stepBefore: curveStepBefore
}

const defaultAccessors: Partial<AreaRendererAccessors> = {
  color: (series: Series, d: Datum) => series.legendColor(),
  interpolate: (series: Series, d: Datum) => "linear",
  closeGaps: (series: Series, d: Datum) => true
}

class Area implements RendererClass<AreaRendererAccessors> {
  closeGaps: RendererAccessor<boolean>
  color: RendererAccessor<string>
  data: Datum[]
  el: D3Selection
  events: EventBus
  interpolate: RendererAccessor<any>
  options: Options
  quantIsY: boolean
  series: Series
  state: State
  type: RendererType = "area"
  x: RendererAccessor<number | Date>
  x0: RendererAccessor<number>
  x1: RendererAccessor<number>
  xScale: any // @TODO
  y: RendererAccessor<number | Date>
  y0: RendererAccessor<number>
  y1: RendererAccessor<number>
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
    this.updateClipPath()

    const duration: number = this.state.current.get("config").duration
    const data: Datum[] = sortBy((d: Datum): any => (this.quantIsY ? this.x(d) : this.y(d)))(this.data)
    const area = this.el.selectAll("path.main").data([data])

    area
      .enter()
      .append("svg:path")
      .attr("class", "main")
      .attr("d", this.startPath.bind(this))
      .merge(area)
      .attr("fill", this.color.bind(this))
      .transition()
      .duration(duration)
      .attr("d", this.path.bind(this))
      .attr("clip-path", `url(#area-clip-${this.series.key()})`)

    area
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
    return el.append("g").attr("class", `series:${this.series.key()} ${styles.area}`)
  }

  private updateClipPath(): void {
    const duration: number = this.state.current.get("config").duration
    const data: Datum[] = this.series.options.clipData ? [this.series.options.clipData] : []

    const clip = this.el.selectAll("clipPath path").data(data)

    clip
      .enter()
      .append("svg:clipPath")
      .attr("id", `area-clip-${this.series.key()}`)
      .append("svg:path")
      .attr("d", this.startClipPath.bind(this))
      .merge(clip)
      .transition()
      .duration(duration)
      .attr("d", this.clipPath.bind(this))

    clip
      .exit()
      .transition()
      .duration(duration)
      .attr("d", this.startClipPath.bind(this))
      .remove()
  }

  private setAxisScales(): void {
    const axisData: AxesData = this.state.current.get("accessors").data.axes(this.state.current.get("data"))
    const axisTypes: AxisType[] = map((axis: AxisPosition): AxisType => axisData[axis].type)([
      this.series.xAxis(),
      this.series.yAxis()
    ])
    if (difference(axisTypes)(["time", "quant"]).length > 0) {
      throw new Error(`The area renderer is incompatible with a ${axisTypes[0]} and a ${axisTypes[1]} axis.`)
    }
    this.xScale = this.state.current.get("computed").axes.computed[this.series.xAxis()].scale
    this.yScale = this.state.current.get("computed").axes.computed[this.series.yAxis()].scale
    this.quantIsY = axisTypes[1] === "quant"
    this.x0 = (d: Datum): any => this.xScale(this.quantIsY ? this.x(d) : d.x0 || 0)
    this.x1 = (d: Datum): any => this.xScale(this.quantIsY ? this.x(d) : d.x1 || this.x(d))
    this.y0 = (d: Datum): any => this.yScale(this.quantIsY ? d.y0 || 0 : this.y(d))
    this.y1 = (d: Datum): any => this.yScale(this.quantIsY ? d.y1 || this.y(d) : this.y(d))
  }

  private assignAccessors(customAccessors: Partial<AreaRendererAccessors>): void {
    const axisAcessors: RendererAxesAccessors = this.state.current.get("accessors").renderer
    const accessors: AreaRendererAccessors = defaults(merge(defaultAccessors)(axisAcessors))(customAccessors)
    this.x = (d: Datum): any => accessors.x(this.series, d) || d.injectedX
    this.y = (d: Datum): any => accessors.y(this.series, d) || d.injectedY
    this.color = (d?: Datum): string => accessors.color(this.series, d)
    this.interpolate = (d?: Datum): any => interpolator[accessors.interpolate(this.series, d)]
    this.closeGaps = (d?: Datum): boolean => accessors.closeGaps(this.series, d)
  }

  private addMissingData(): void {
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

  private startPath(data: Datum[]): string {
    const isDefined = (d: Datum) => !!this.x(d) && !!this.y(d)
    return (d3Area() as any)
      .x(this.x0)
      .y(this.y0)
      .curve(this.interpolate())
      .defined(isDefined)(data)
  }

  private path(data: Datum[]): string {
    const isDefined = (d: Datum) => !!this.x(d) && !!this.y(d)
    return (d3Area() as any)
      .x0(this.x0)
      .x1(this.x1)
      .y0(this.y0)
      .y1(this.y1)
      .curve(this.interpolate())
      .defined(isDefined)(data)
  }

  private startClipPath(data: Datum[]): string {
    return (d3Area() as any)
      .x((d: Datum): any => this.xScale(this.quantIsY ? this.x(d) : 0))
      .y((d: Datum): any => this.yScale(this.quantIsY ? 0 : this.y(d)))
      .curve(this.interpolate())(data)
  }

  private clipPath(data: Datum[]): string {
    return (d3Area() as any)
      .x0(this.x0)
      .x1(this.x1)
      .y0((d: Datum) => (this.quantIsY ? 0 : this.y0(d)))
      .y1(this.y1)
      .curve(this.interpolate())(data)
  }
}

export default Area
