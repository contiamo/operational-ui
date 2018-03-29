import { compact, defaults, difference, find, forEach, get, isNil, map, sortBy } from "lodash/fp"
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

const defaultAccessors: AreaRendererAccessors = {
  x: (series: Series, d: Datum) => d.x,
  y: (series: Series, d: Datum) => d.y,
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

  appendSeriesGroup(el: D3Selection): D3Selection {
    return el.append("g").attr("class", `series:${this.series.key()} ${styles.area}`)
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

  assignAccessors(customAccessors: Partial<AreaRendererAccessors>): void {
    const accessors: AreaRendererAccessors = defaults(defaultAccessors)(customAccessors)
    this.x = (d: Datum): any => accessors.x(this.series, d) || d.injectedX
    this.y = (d: Datum): any => accessors.y(this.series, d) || d.injectedY
    this.color = (d?: Datum): string => accessors.color(this.series, d)
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
    return (d3Area() as any)
      .x(this.x0)
      .y(this.y0)
      .curve(this.interpolate())
      .defined(isDefined)(data)
  }

  path(data: Datum[]): string {
    const isDefined = (d: Datum) => !!this.x(d) && !!this.y(d)
    return (d3Area() as any)
      .x0(this.x0)
      .x1(this.x1)
      .y0(this.y0)
      .y1(this.y1)
      .curve(this.interpolate())
      .defined(isDefined)(data)
  }

  draw(): void {
    this.setAxisScales()
    this.addMissingData()

    const data: Datum[] = sortBy((d: Datum): any => (this.quantIsY ? this.x(d) : this.y(d)))(this.data)
    const area = this.el.selectAll("path").data([data])

    area
      .enter()
      .append("svg:path")
      .attr("d", this.startPath.bind(this))
      .attr("fill", this.color.bind(this))
      .merge(area)
      .transition()
      .duration(this.state.current.get("config").duration)
      .attr("d", this.path.bind(this))
      .attr("fill", this.color.bind(this))

    area
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

export default Area
