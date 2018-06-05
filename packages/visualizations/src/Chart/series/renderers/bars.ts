import { clone, compact, defaults, filter, get, isFinite, last, map, sortBy } from "lodash/fp"
import Series from "../series"
import * as styles from "./styles"
import { withD3Element, setRectAttributes } from "../../../utils/d3_utils"
import { area as d3Area, curveStepAfter } from "d3-shape"
import {
  BarsRendererAccessors,
  D3Selection,
  Datum,
  EventBus,
  RendererAccessor,
  RendererClass,
  RendererType,
  SingleRendererOptions,
  State,
} from "../../typings"
import Events from "../../../shared/event_catalog"

export type Options = SingleRendererOptions<BarsRendererAccessors>

const defaultAccessors: Partial<BarsRendererAccessors> = {
  color: (series: Series, d: Datum) => series.legendColor(),
  barWidth: (series: Series, d: Datum) => undefined,
  opacity: (series: Series, d: Datum) => 0.8,
}

class Bars implements RendererClass<BarsRendererAccessors> {
  barWidth: RendererAccessor<number>
  color: RendererAccessor<string>
  data: Datum[]
  el: D3Selection
  events: EventBus
  isRange: boolean
  options: Options
  series: Series
  state: any
  type: RendererType = "bars"
  opacity: RendererAccessor<number>
  x: RendererAccessor<number | Date | string>
  x0: RendererAccessor<number>
  x1: RendererAccessor<number>
  xIsBaseline: boolean
  xScale: any
  y: RendererAccessor<number | Date | string>
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
    this.updateClipPath()

    const data = filter(this.validate.bind(this))(this.data)
    const duration = this.state.current.get("config").duration
    this.el
      .transition()
      .duration(!!this.el.attr("transform") ? duration : 0)
      .attr("transform", this.seriesTranslation())

    const attributes = this.attributes()
    const startAttributes = this.startAttributes(attributes)

    const bars = this.el.selectAll("rect").data(data)

    bars
      .enter()
      .append("svg:rect")
      .call(setRectAttributes, startAttributes)
      .merge(bars)
      .on("mouseenter", withD3Element(this.onMouseOver.bind(this)))
      .on("mouseout", this.onMouseOut.bind(this))
      .on("click", withD3Element(this.onClick.bind(this)))
      .attr("clip-path", `url(#area-clip-${this.series.key()}`)
      .attr("opacity", this.opacity.bind(this))
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

  dataForAxis(axis: "x" | "y") {
    const data = map((this as any)[axis])(this.data)
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
    this.xScale = this.state.current.get(["computed", "axes", "computed", this.series.xAxis(), "scale"])
    this.yScale = this.state.current.get(["computed", "axes", "computed", this.series.yAxis(), "scale"])
    this.x0 = (d: Datum) => {
      const baseline = this.isRange ? this.xScale.domain()[0] : 0
      return this.xScale(
        this.xIsBaseline ? this.x(d) : Math.min(d.x0, d.x1) || (this.x(d) > baseline ? baseline : this.x(d))
      )
    }
    this.x1 = (d: Datum) => {
      const baseline = this.isRange ? this.xScale.domain()[0] : 0
      return this.xScale(
        this.xIsBaseline ? this.x(d) : Math.max(d.x0, d.x1) || (this.x(d) > baseline ? this.x(d) : baseline)
      )
    }
    this.y0 = (d: Datum) => {
      const baseline = this.isRange ? this.yScale.domain()[0] : 0
      return this.yScale(
        this.xIsBaseline ? Math.min(d.y0, d.y1) || (this.y(d) > baseline ? baseline : this.y(d)) : this.y(d)
      )
    }
    this.y1 = (d: Datum) => {
      const baseline = this.isRange ? this.yScale.domain()[0] : 0
      return this.yScale(
        this.xIsBaseline ? Math.max(d.y0, d.y1) || (this.y(d) > baseline ? this.y(d) : baseline) : this.y(d)
      )
    }
  }

  private validate(d: Datum): boolean {
    return isFinite(this.xScale(this.x(d))) && isFinite(this.yScale(this.y(d)))
  }

  private assignAccessors(customAccessors: Partial<BarsRendererAccessors>): void {
    const accessors: BarsRendererAccessors = defaults(defaultAccessors)(customAccessors)
    this.x = (d: Datum) => this.series.x(d) || d.injectedX
    this.y = (d: Datum) => this.series.y(d) || d.injectedY
    this.color = (d?: Datum) => accessors.color(this.series, d)
    this.barWidth = (d?: Datum) => accessors.barWidth(this.series, d)
    this.opacity = (d?: Datum) => accessors.opacity(this.series, d)
  }

  private seriesTranslation(): string {
    const seriesBars = this.state.current.get(["computed", "axes", "computedBars", this.series.key()])
    return this.xIsBaseline ? `translate(${seriesBars.offset}, 0)` : `translate(0, ${seriesBars.offset})`
  }

  private startAttributes(attributes: any) {
    return {
      x: this.xIsBaseline ? this.x0 : this.xScale(0),
      y: this.xIsBaseline ? this.yScale(0) : this.y0,
      width: this.xIsBaseline ? attributes.width : 0,
      height: this.xIsBaseline ? 0 : attributes.height,
      color: attributes.color,
    }
  }

  private attributes() {
    const barWidth = this.state.current.get(["computed", "axes", "computedBars", this.series.key(), "width"])
    return {
      x: this.x0,
      y: this.y1,
      width: this.xIsBaseline ? barWidth : (d: Datum) => this.x1(d) - this.x0(d),
      height: this.xIsBaseline ? (d: Datum) => this.y0(d) - this.y1(d) : barWidth,
      color: this.color.bind(this),
    }
  }

  private onMouseOver(d: Datum, el: HTMLElement): void {
    const isNegative = this.xIsBaseline ? this.y(d) < 0 : this.x(d) < 0
    const dimensions = el.getBoundingClientRect()
    const barOffset = this.state.current.get(["computed", "axes", "computedBars", this.series.key(), "offset"])

    const focusPoint = {
      element: this.xIsBaseline ? this.x(d) : this.y(d),
      value: this.xIsBaseline ? this.y(d) : this.x(d),
      position: this.xIsBaseline ? (isNegative ? "below" : "above") : isNegative ? "toLeft" : "toRight",
      seriesName: this.series.legendName(),
      seriesColor: this.series.legendColor(),
      offset: 0,
      focus: {
        x: this.xIsBaseline ? this.x1(d) + barOffset + dimensions.width / 2 : isNegative ? this.x0(d) : this.x1(d),
        y: this.xIsBaseline ? (isNegative ? this.y0(d) : this.y1(d)) : this.y1(d) + barOffset + dimensions.height / 2,
      },
    }

    this.events.emit(Events.FOCUS.ELEMENT.HOVER, focusPoint)
  }

  private onMouseOut(): void {
    this.events.emit(Events.FOCUS.ELEMENT.OUT)
  }

  private onClick(d: Datum, el: HTMLElement): void {
    this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d, el })
  }

  private updateClipPath(): void {
    if (!this.isRange) {
      return
    }
    const duration = this.state.current.get("config").duration
    const mainData = sortBy((d: Datum) => (this.xIsBaseline ? this.x(d) : this.y(d)))(this.data)
    let data = this.series.options.clipData

    // The curveStepAfter interpolation does not account for the width of the bars.
    // A dummy point is added to the data to prevent the clip-path from cutting off the last point.
    const dummyPoint = clone(this.xIsBaseline ? last(data) : data[0])
    delete dummyPoint[this.xIsBaseline ? this.series.xAttribute() : this.series.yAttribute()]
    this.xIsBaseline ? data.push(dummyPoint) : (data = [dummyPoint].concat(data))

    const clip = this.el.selectAll("clipPath path").data([data])

    clip
      .enter()
      .append("svg:clipPath")
      .attr("id", `area-clip-${this.series.key()}`)
      .append("svg:path")
      .merge(clip)
      .transition()
      .duration(duration)
      .attr("d", this.clipPath.bind(this))

    clip.exit().remove()
  }

  private clipPath(data: any[]): string {
    const barWidth = this.state.current.get("computed").axes.computedBars[this.series.key()].width
    return d3Area()
      .x0(this.xIsBaseline ? (d: Datum) => this.x0(d) || this.xScale.range()[1] + barWidth : this.xScale.range()[1])
      .x1((d: Datum) => this.x1(d) || this.xScale.range()[1] + barWidth)
      .y0(this.xIsBaseline ? this.yScale.range()[1] : (d: Datum) => this.y0(d) || this.yScale.range()[0] + barWidth)
      .y1((d: Datum) => this.y1(d) || this.yScale.range()[0] + barWidth)
      .curve(curveStepAfter)(data)
  }
}

export default Bars
