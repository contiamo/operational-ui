import { compact, defaults, filter, forEach, get, isBoolean, map } from "lodash/fp"
import Series from "../series"
import * as styles from "./styles"

import {
  TextRendererAccessors,
  TextRendererConfig,
  D3Selection,
  Datum,
  EventBus,
  RendererAccessor,
  RendererClass,
  RendererType,
  SingleRendererOptions,
  State,
} from "../../typings"

export type Options = SingleRendererOptions<TextRendererAccessors>

const defaultAccessors: Partial<TextRendererAccessors> = {
  size: (series: Series, d: Datum) => 10,
  opacity: (series: Series, d: Datum) => 1,
}

const verticalTiltAngle = -60
const horizontalTiltAngle = -30

class Text implements RendererClass<TextRendererAccessors> {
  data: Datum[]
  el: D3Selection
  events: EventBus
  opacity: RendererAccessor<number>
  options: Options
  series: Series
  size: RendererAccessor<number>
  state: State
  type: RendererType = "text"
  xIsBaseline: boolean
  x: RendererAccessor<number>
  xScale: any
  y: RendererAccessor<number>
  yScale: any
  // Config
  offset: number = 2
  tilt: boolean

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
    this.assignConfig(options.config)
    this.data = data
  }

  dataForAxis(axis: "x" | "y") {
    const data = map((this as any)[axis])(this.data)
      .concat(map(get(`${axis}0`))(this.data))
      .concat(map(get(`${axis}1`))(this.data))
    return compact(data)
  }

  draw(): void {
    this.setAxisScales()
    const data = filter(this.validate.bind(this))(this.data)
    const duration = this.state.current.get("config").duration
    const startAttributes = this.startAttributes()
    const attributes = this.attributes()

    const text = this.el.selectAll("text").data(data)

    text
      .enter()
      .append("text")
      .attr("x", startAttributes.x)
      .attr("y", startAttributes.y)
      .style("font-size", `${this.size()}px`)
      .text(startAttributes.text)
      .attr("text-anchor", attributes.anchor)
      .attr("transform", startAttributes.transform)
      .attr("dominant-baseline", attributes.baseline)
      .merge(text)
      .transition()
      .duration(duration)
      .attr("x", attributes.x)
      .attr("y", attributes.y)
      .attr("text-anchor", attributes.anchor)
      .attr("dominant-baseline", attributes.baseline)
      .style("font-size", `${this.size()}px`)
      .attr("opacity", this.opacity.bind(this))
      .text(attributes.text)
      .attr("transform", attributes.transform)

    text
      .exit()
      .transition()
      .duration(duration)
      .attr("x", startAttributes.x)
      .attr("y", startAttributes.y)
      .text(startAttributes.text)
      .remove()
  }

  close(): void {
    this.el.remove()
  }

  // Private methods
  private appendSeriesGroup(el: D3Selection): D3Selection {
    return el.append("g").attr("class", `series:${this.series.key()} ${styles.text}`)
  }

  private assignAccessors(customAccessors: Partial<TextRendererAccessors>): void {
    const accessors = defaults(defaultAccessors)(customAccessors)
    this.x = (d: Datum): any => this.series.x(d) || d.injectedX
    this.y = (d: Datum): any => this.series.y(d) || d.injectedY
    this.size = (d?: Datum) => accessors.size(this.series, d)
    this.opacity = (d?: Datum) => accessors.opacity(this.series, d)
  }

  private assignConfig(customConfig: Partial<TextRendererConfig>): void {
    forEach.convert({ cap: false })((value: any, key: string) => {
      ;(this as any)[key] = value
    })(customConfig)
  }

  private setAxisScales(): void {
    this.xIsBaseline = this.state.current.get("computed").axes.baseline === "x"
    this.xScale = this.state.current.get(["computed", "axes", "computed", this.series.xAxis(), "scale"])
    this.yScale = this.state.current.get(["computed", "axes", "computed", this.series.yAxis(), "scale"])
    if (!isBoolean(this.tilt)) {
      this.tilt = this.xIsBaseline
    }
  }

  private validate(d: Datum): boolean {
    return isFinite(this.xScale(this.x(d))) && isFinite(this.yScale(this.y(d)))
  }

  private startAttributes() {
    const computedBars = this.state.current.get("computed").axes.computedBars
    const offset = computedBars && computedBars[this.series.key()] ? computedBars[this.series.key()].width / 2 : 0
    const rotate = this.tilt ? (this.xIsBaseline ? verticalTiltAngle : horizontalTiltAngle) : 0

    const attrs: any = {
      x: (d: Datum) => this.xScale(this.xIsBaseline ? this.x(d) : 0) - (this.xIsBaseline ? offset : 0),
      y: (d: Datum) => this.yScale(this.xIsBaseline ? 0 : this.y(d)) - (this.xIsBaseline ? 0 : offset),
      text: (d: Datum) => (this.xIsBaseline ? this.y(d) : this.x(d)).toString(),
    }
    attrs.transform = (d: Datum) => `rotate(${rotate}, ${attrs.x(d)}, ${attrs.y(d)})`
    return attrs
  }

  private attributes() {
    const computedBars = this.state.current.get("computed").axes.computedBars
    const barOffset =
      computedBars && computedBars[this.series.key()]
        ? computedBars[this.series.key()].offset + computedBars[this.series.key()].width / 2
        : 0
    const symbolOffset = (d: Datum) => (this.series.symbolOffset ? this.series.symbolOffset(d) : 0) + this.offset
    const rotate = this.tilt ? (this.xIsBaseline ? verticalTiltAngle : horizontalTiltAngle) : 0
    const x = (d: Datum) => d.x1 || this.x(d)
    const y = (d: Datum) => d.y1 || this.y(d)
    const isPositive = (d: Datum) => (this.xIsBaseline ? y(d) >= 0 : x(d) >= 0)

    const attrs: any = {
      x: (d: Datum) => this.xScale(x(d)) + (this.xIsBaseline ? barOffset : symbolOffset(d) * (isPositive(d) ? 1 : -1)),
      y: (d: Datum) => this.yScale(y(d)) + (this.xIsBaseline ? symbolOffset(d) * (isPositive(d) ? -1 : 1) : barOffset),
      text: (d: Datum) => (this.xIsBaseline ? this.y(d) : this.x(d)).toString(),
      anchor: (d: Datum) => (this.xIsBaseline && !this.tilt ? "middle" : isPositive(d) ? "start" : "end"),
      baseline: this.xIsBaseline ? "initial" : "central",
    }
    attrs.transform = (d: Datum) => `rotate(${rotate}, ${attrs.x(d)}, ${attrs.y(d)})`
    return attrs
  }
}

export default Text
