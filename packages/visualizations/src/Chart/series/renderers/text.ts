import { compact, defaults, filter, forEach, get, isBoolean, map } from "lodash/fp"
import Series from "../series"
import * as styles from "./styles"
import {
  TextRendererAccessors,
  TextRendererConfig,
  ChartConfig,
  D3Selection,
  Datum,
  EventBus,
  Object,
  RendererAccessor,
  RendererClass,
  RendererOptions,
  RendererType,
  State,
} from "../../typings"

export type Options = RendererOptions<TextRendererAccessors>

const defaultAccessors: Partial<TextRendererAccessors> = {
  size: (series: Series, d: Datum) => 10,
}

const verticalTiltAngle: number = -60
const horizontalTiltAngle: number = -30

class Text implements RendererClass<TextRendererAccessors> {
  data: Datum[]
  el: D3Selection
  events: EventBus
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

  dataForAxis(axis: "x" | "y"): any[] {
    const data: any[] = map((this as any)[axis])(this.data)
      .concat(map(get(`${axis}0`))(this.data))
      .concat(map(get(`${axis}1`))(this.data))
    return compact(data)
  }

  draw(): void {
    this.setAxisScales()
    const data: Datum[] = filter(this.validate.bind(this))(this.data)
    const duration: number = this.state.current.get("config").duration
    const startAttributes: Object<any> = this.startAttributes()
    const attributes: Object<any> = this.attributes()

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
    const accessors: TextRendererAccessors = defaults(defaultAccessors)(customAccessors)
    this.x = (d: Datum): any => this.series.x(d) || d.injectedX
    this.y = (d: Datum): any => this.series.y(d) || d.injectedY
    this.size = (d?: Datum): number => accessors.size(this.series, d)
  }

  private assignConfig(customConfig: Partial<TextRendererConfig>): void {
    forEach.convert({ cap: false })((value: any, key: string): void => {
      ;(this as any)[key] = value
    })(customConfig)
  }

  private setAxisScales(): void {
    this.xIsBaseline = this.state.current.get("computed").axes.baseline === "x"
    this.xScale = this.state.current.get("computed").axes.computed[this.series.xAxis()].scale
    this.yScale = this.state.current.get("computed").axes.computed[this.series.yAxis()].scale
    if (!isBoolean(this.tilt)) {
      this.tilt = this.xIsBaseline
    }
  }

  private validate(d: Datum): boolean {
    return isFinite(this.xScale(this.x(d))) && isFinite(this.yScale(this.y(d)))
  }

  private startAttributes(): Object<any> {
    const computedBars: Object<any> = this.state.current.get("computed").axes.computedBars
    const offset: number =
      computedBars && computedBars[this.series.key()] ? computedBars[this.series.key()].width / 2 : 0
    const rotate: number = this.tilt ? (this.xIsBaseline ? verticalTiltAngle : horizontalTiltAngle) : 0

    const attrs: Object<any> = {
      x: (d: Datum): number => this.xScale(this.xIsBaseline ? this.x(d) - offset : 0),
      y: (d: Datum): number => this.yScale(this.xIsBaseline ? 0 : this.y(d) - offset),
      text: (d: Datum): string => (this.xIsBaseline ? this.y(d) : this.x(d)).toString(),
    }
    attrs.transform = (d: Datum): string => `rotate(${rotate}, ${attrs.x(d)}, ${attrs.y(d)})`
    return attrs
  }

  private attributes(): Object<any> {
    const computedBars: Object<any> = this.state.current.get("computed").axes.computedBars
    const barOffset: number =
      computedBars && computedBars[this.series.key()]
        ? computedBars[this.series.key()].offset + computedBars[this.series.key()].width / 2
        : 0
    const symbolOffset = (d: Datum) => (this.series.symbolOffset ? this.series.symbolOffset(d) : 0) + this.offset
    const rotate: number = this.tilt ? (this.xIsBaseline ? verticalTiltAngle : horizontalTiltAngle) : 0

    const attrs: Object<any> = {
      x: (d: Datum): number => this.xScale(d.x1 || this.x(d)) + (this.xIsBaseline ? barOffset : symbolOffset(d)),
      y: (d: Datum): number => this.yScale(d.y1 || this.y(d)) + (this.xIsBaseline ? -symbolOffset(d) : barOffset),
      text: (d: Datum): string => (this.xIsBaseline ? this.y(d) : this.x(d)).toString(),
      anchor: this.xIsBaseline && !this.tilt ? "middle" : "start",
      baseline: this.xIsBaseline ? "initial" : "central",
    }
    attrs.transform = (d: Datum): string => `rotate(${rotate}, ${attrs.x(d)}, ${attrs.y(d)})`
    return attrs
  }
}

export default Text
