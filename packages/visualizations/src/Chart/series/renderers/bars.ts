import { compact, defaults, filter, get, includes, isFinite, map } from "lodash/fp"
import Series from "../series"
import * as styles from "./styles"
import { setRectAttributes } from "../../../utils/d3_utils"
import {
  AxesData,
  AxisType,
  AxisPosition,
  BarsRendererAccessors,
  D3Selection,
  Datum,
  EventBus,
  Object,
  RendererAccessor,
  RendererClass,
  RendererOptions,
  RendererType,
  State
} from "../../typings"

export type Options = RendererOptions<BarsRendererAccessors>

const defaultAccessors: Partial<BarsRendererAccessors> = {
  color: (series: Series, d: Datum) => series.legendColor(),
  barWidth: (series: Series, d: Datum) => undefined
}

class Bars implements RendererClass<BarsRendererAccessors> {
  barWidth: RendererAccessor<number>
  color: RendererAccessor<string>
  data: Datum[]
  el: D3Selection
  events: EventBus
  options: Options
  series: Series
  state: any
  type: RendererType = "bars"
  x: RendererAccessor<number | Date | string>
  x0: RendererAccessor<number>
  x1: RendererAccessor<number>
  xIsBaseline: boolean
  xScale: any // @TODO
  y: RendererAccessor<number | Date | string>
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
    const data: Datum[] = filter(this.validate.bind(this))(this.data)
    const duration: number = this.state.current.get("config").duration

    this.el
      .transition()
      .duration(!!this.el.attr("transform") ? duration : 0)
      .attr("transform", this.seriesTranslation())

    const attributes: Object<any> = this.attributes()
    const startAttributes: Object<any> = this.startAttributes(attributes)

    const bars = this.el.selectAll("rect").data(data)

    bars
      .enter()
      .append("svg:rect")
      .call(setRectAttributes, startAttributes)
      .merge(bars)
      .call(setRectAttributes, attributes, duration)

    bars
      .exit()
      .transition()
      .duration(duration)
      .call(setRectAttributes, startAttributes)
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
    return el.append("g").attr("class", `series:${this.series.key()} ${styles.bar}`)
  }

  private setAxisScales(): void {
    this.xIsBaseline = this.state.current.get("computed").axes.baseline === "x"
    const axisData: AxesData = this.state.current.get("accessors").data.axes(this.state.current.get("data"))
    const axisTypes: AxisType[] = map((axis: AxisPosition): string => axisData[axis].type)([
      this.series.xAxis(),
      this.series.yAxis()
    ])
    if (!includes("quant")(axisTypes)) {
      throw new Error(`The bar renderer requires a quant axis.`)
    }
    this.xScale = this.state.current.get("computed").axes.computed[this.series.xAxis()].scale
    this.yScale = this.state.current.get("computed").axes.computed[this.series.yAxis()].scale
    this.x0 = (d: Datum): any => this.xScale(this.xIsBaseline ? this.x(d) : d.x0 || 0)
    this.x1 = (d: Datum): any => this.xScale(this.xIsBaseline ? this.x(d) : d.x1 || this.x(d))
    this.y0 = (d: Datum): any => this.yScale(this.xIsBaseline ? d.y0 || 0 : this.y(d))
    this.y1 = (d: Datum): any => this.yScale(this.xIsBaseline ? d.y1 || this.y(d) : this.y(d))
  }

  private validate(d: Datum): boolean {
    return isFinite(this.xScale(this.x(d))) && isFinite(this.yScale(this.y(d)))
  }

  private assignAccessors(customAccessors: Partial<BarsRendererAccessors>): void {
    const accessors: BarsRendererAccessors = defaults(defaultAccessors)(customAccessors)
    this.x = (d: Datum): any => this.series.x(d) || d.injectedX
    this.y = (d: Datum): any => this.series.y(d) || d.injectedY
    this.color = (d?: Datum): string => accessors.color(this.series, d)
    this.barWidth = (d?: Datum): number => accessors.barWidth(this.series, d)
  }

  private seriesTranslation(): string {
    const seriesBars: Object<any> = this.state.current.get("computed").axes.computedBars[this.series.key()]
    return this.xIsBaseline ? `translate(${seriesBars.offset}, 0)` : `translate(0, ${seriesBars.offset})`
  }

  private startAttributes(attributes: Object<any>): Object<any> {
    return {
      x: this.xIsBaseline ? this.x0 : 0,
      y: this.xIsBaseline ? this.yScale(0) : this.y0,
      width: this.xIsBaseline ? attributes.width : 0,
      height: this.xIsBaseline ? 0 : attributes.height,
      color: attributes.color
    }
  }

  private attributes(): Object<any> {
    const barWidth: number = this.state.current.get("computed").axes.computedBars[this.series.key()].width
    return {
      x: this.x0,
      y: this.y1,
      width: this.xIsBaseline ? barWidth : (d: Datum): number => this.x1(d) - this.x0(d),
      height: this.xIsBaseline ? (d: Datum): number => this.y0(d) - this.y1(d) : barWidth,
      color: this.color.bind(this)
    }
  }
}

export default Bars
