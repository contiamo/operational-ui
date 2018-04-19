import { compact, defaults, filter, get, map } from "lodash/fp"
import Series from "../series"
import * as styles from "./styles"
import {
  symbol as d3Symbol,
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle
} from "d3-shape"

import {
  SymbolRendererAccessors,
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

const defaultAccessors: SymbolRendererAccessors = {
  fill: (series: Series, d: Datum) => "#fff",
  size: (series: Series, d: Datum) => 50,
  stroke: (series: Series, d: Datum) => series.legendColor(),
  symbol: (series: Series, d: Datum) => "circle",
  x: (series: Series, d: Datum) => d.x,
  y: (series: Series, d: Datum) => d.y
}

const symbolOptions: Object<any> = {
  circle: symbolCircle,
  cross: symbolCross,
  diamond: symbolDiamond,
  square: symbolSquare,
  squareDiamond: symbolSquare, // @TODO rotation
  star: symbolStar,
  triangle: symbolTriangle
}

export type Options = RendererOptions<SymbolRendererAccessors>

class Symbol implements RendererClass<SymbolRendererAccessors> {
  data: Datum[]
  el: D3Selection
  events: EventBus
  fill: RendererAccessor<string>
  options: Options
  series: Series
  size: RendererAccessor<number>
  state: any
  stroke: RendererAccessor<string>
  symbol: RendererAccessor<any>
  type: RendererType = "symbol"
  xIsBaseline: boolean
  x: RendererAccessor<number | Date>
  xScale: any // @TODO
  y: RendererAccessor<number | Date>
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

    const symbols = this.el.selectAll("path").data(data)

    symbols
      .enter()
      .append("svg:path")
      .attr("d", (d: Datum): string =>
        d3Symbol()
          .type(this.symbol(d))
          .size(1)()
      )
      .attr("transform", this.startTransform.bind(this))
      .merge(symbols)
      .attr("fill", this.fill())
      .attr("stroke", this.stroke())
      .transition()
      .duration(duration)
      .attr("d", (d: Datum): string =>
        d3Symbol()
          .type(this.symbol(d))
          .size(this.size(d))()
      )
      .attr("transform", this.transform.bind(this))

    symbols
      .exit()
      .transition()
      .duration(duration)
      .attr("d", (d: Datum): string =>
        d3Symbol()
          .type(this.symbol(d))
          .size(1)()
      )
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
    return el.append("g").attr("class", `series:${this.series.key()} ${styles.symbol}`)
  }

  private validate(d: Datum): boolean {
    return isFinite(this.xScale(this.x(d))) && isFinite(this.yScale(this.y(d)))
  }

  private assignAccessors(customAccessors: Partial<SymbolRendererAccessors>): void {
    const accessors: SymbolRendererAccessors = defaults(defaultAccessors)(customAccessors)
    this.x = (d: Datum): any => accessors.x(this.series, d) || d.injectedX
    this.y = (d: Datum): any => accessors.y(this.series, d) || d.injectedY
    this.fill = (d?: Datum): string => accessors.fill(this.series, d)
    this.stroke = (d?: Datum): string => accessors.stroke(this.series, d)
    this.symbol = (d: Datum): any => symbolOptions[accessors.symbol(this.series, d)]
    this.size = (d: Datum): number => accessors.size(this.series, d)
  }

  private setAxisScales(): void {
    this.xIsBaseline = this.state.current.get("computed").axes.baseline === "x"
    this.xScale = this.state.current.get("computed").axes.computed[this.series.xAxis()].scale
    this.yScale = this.state.current.get("computed").axes.computed[this.series.yAxis()].scale
  }

  private transform(d: Datum): string {
    const x: number = this.xScale(d.x1 || this.x(d))
    const y: number = this.yScale(d.y1 || this.y(d))
    return `translate(${x}, ${y})`
  }

  private startTransform(d: Datum): string {
    const x: number = this.xScale(this.xIsBaseline ? d.x1 || this.x(d) : 0)
    const y: number = this.yScale(this.xIsBaseline ? 0 : d.y1 || this.y(d))
    return `translate(${x}, ${y})`
  }
}

export default Symbol
