import { compact, defaults, find, forEach, get, map, sortBy } from "lodash/fp"
import Series from "../series"

import {
  area as d3Area,
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
  AreaRendererAccessors,
  D3Selection,
  Datum,
  EventBus,
  RendererAccessor,
  RendererClass,
  RendererType,
  SingleRendererOptions,
  State,
} from "../../typings"

export type Options = SingleRendererOptions<AreaRendererAccessors>

const interpolator = {
  cardinal: curveCardinal,
  linear: curveLinear,
  monotoneX: curveMonotoneX,
  monotoneY: curveMonotoneY,
  step: curveStep,
  stepAfter: curveStepAfter,
  stepBefore: curveStepBefore,
}

const defaultAccessors: Partial<AreaRendererAccessors> = {
  color: (series: Series, d: Datum) => series.legendColor(),
  interpolate: (series: Series, d: Datum) => "linear",
  closeGaps: (series: Series, d: Datum) => true,
  opacity: (series: Series, d: Datum) => 0.6,
}

const hasValue = (d: any): boolean => {
  return !!d || d === 0
}

class Area implements RendererClass<AreaRendererAccessors> {
  closeGaps: RendererAccessor<boolean>
  color: RendererAccessor<string>
  data: Datum[]
  el: D3Selection
  events: EventBus
  interpolate: RendererAccessor<any>
  isRange: boolean
  opacity: RendererAccessor<number>
  options: Options
  series: Series
  state: State
  type: RendererType = "area"
  xIsBaseline: boolean
  x: RendererAccessor<string | number | Date>
  x0: RendererAccessor<number>
  x1: RendererAccessor<number>
  xScale: any
  y: RendererAccessor<string | number | Date>
  y0: RendererAccessor<number>
  y1: RendererAccessor<number>
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
    this.isRange = !!this.series.options.clipData
  }

  draw(): void {
    this.setAxisScales()
    this.addMissingData()
    this.updateClipPath()

    const duration = this.state.current.get("config").duration
    const data = sortBy((d: Datum) => (this.xIsBaseline ? this.x(d) : this.y(d)))(this.data)
    const area = this.el.selectAll("path.main").data([data])

    area
      .enter()
      .append("svg:path")
      .attr("class", "main")
      .attr("d", this.startPath.bind(this))
      .merge(area)
      .attr("fill", this.color.bind(this))
      .attr("stroke", this.color.bind(this))
      .transition()
      .duration(duration)
      .attr("d", this.path.bind(this))
      .attr("opacity", this.opacity.bind(this))
      .attr("clip-path", `url(#area-clip-${this.series.key()}`)

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
    const data = map((this as any)[axis])(this.data)
      .concat(map(get(`${axis}0`))(this.data))
      .concat(map(get(`${axis}1`))(this.data))
    return compact(data)
  }

  // Private methods
  private appendSeriesGroup(el: D3Selection): D3Selection {
    return el.append("g").attr("class", `series:${this.series.key()} ${styles.area}`)
  }

  private setAxisScales(): void {
    this.xIsBaseline = this.state.current.get("computed").axes.baseline === "x"
    this.xScale = this.state.current.get(["computed", "axes", "computed", this.series.xAxis(), "scale"])
    this.yScale = this.state.current.get(["computed", "axes", "computed", this.series.yAxis(), "scale"])
    this.x0 = (d: Datum) => {
      const baseline = this.isRange ? this.xScale.domain()[0] : 0
      return this.xScale(this.xIsBaseline ? this.x(d) : hasValue(d.x0) ? d.x0 : baseline)
    }
    this.x1 = (d: Datum) => this.xScale(this.xIsBaseline ? this.x(d) : hasValue(d.x1) ? d.x1 : this.x(d))
    this.y0 = (d: Datum) => {
      const baseline = this.isRange ? this.yScale.domain()[0] : 0
      return this.yScale(this.xIsBaseline ? (hasValue(d.y0) ? d.y0 : baseline) : this.y(d))
    }
    this.y1 = (d: Datum) => this.yScale(this.xIsBaseline ? (hasValue(d.y1) ? d.y1 : this.y(d)) : this.y(d))
  }

  private assignAccessors(customAccessors: Partial<AreaRendererAccessors>): void {
    const accessors: AreaRendererAccessors = defaults(defaultAccessors)(customAccessors)
    this.x = (d: Datum) => (hasValue(this.series.x(d)) ? this.series.x(d) : d.injectedX)
    this.y = (d: Datum) => (hasValue(this.series.y(d)) ? this.series.y(d) : d.injectedY)
    this.color = (d?: Datum) => accessors.color(this.series, d)
    this.interpolate = (d?: Datum) => interpolator[accessors.interpolate(this.series, d)]
    this.closeGaps = (d?: Datum) => accessors.closeGaps(this.series, d)
    this.opacity = (d?: Datum) => accessors.opacity(this.series, d)
  }

  private addMissingData(): void {
    if (this.closeGaps() || this.series.options.stacked) {
      return
    }
    const ticks = this.state.current.get([
      "computed",
      "axes",
      "computed",
      this.xIsBaseline ? this.series.xAxis() : this.series.yAxis(),
      "ticksInDomain",
    ])
    forEach((tick: Date) => {
      if (!find((d: Datum) => (this.xIsBaseline ? this.x : this.y)(d).toString() === tick.toString())(this.data)) {
        this.data.push({
          [this.xIsBaseline ? "injectedX" : "injectedY"]: tick,
        })
      }
    })(ticks)
  }

  private updateClipPath(): void {
    const duration = this.state.current.get("config").duration
    const mainData = sortBy((d: Datum) => (this.xIsBaseline ? this.x(d) : this.y(d)))(this.data)
    const data = this.isRange ? [this.series.options.clipData] : []

    const clip = this.el.selectAll("clipPath path").data(data)

    clip
      .enter()
      .append("svg:clipPath")
      .attr("id", `area-clip-${this.series.key()}`)
      .append("svg:path")
      .attr("d", this.startPath.bind(this))
      .merge(clip)
      .transition()
      .duration(duration)
      .attr("d", this.clipPath.bind(this))

    clip
      .exit()
      .transition()
      .duration(duration)
      .attr("d", this.startPath.bind(this))
      .remove()
  }

  private isDefined(d: Datum): boolean {
    return this.series.options.stacked && this.closeGaps() ? true : hasValue(this.x(d)) && hasValue(this.y(d))
  }

  private createAreaPath(attributes: any): any {
    return d3Area()
      .x0(attributes.x0 || attributes.x)
      .x1(attributes.x1 || attributes.x)
      .y0(attributes.y0 || attributes.y)
      .y1(attributes.y1 || attributes.y)
      .curve(this.interpolate())
      .defined(this.isDefined.bind(this))
  }

  private startPath(data: Datum[]): string {
    return this.createAreaPath({
      x: (d: Datum) => this.xScale(this.xIsBaseline ? this.x(d) : 0),
      y: (d: Datum) => this.yScale(this.xIsBaseline ? 0 : this.y(d)),
    })(data)
  }

  private path(data: Datum[]): string {
    return this.createAreaPath(this)(data)
  }

  private clipPath(data: Datum[]): string {
    return this.createAreaPath({
      x0: this.xIsBaseline ? this.x0 : this.xScale.range()[1],
      x1: this.x1,
      y0: (d: Datum) => (this.xIsBaseline ? 0 : this.y0(d)),
      y1: this.y1,
    })(data)
  }
}

export default Area
