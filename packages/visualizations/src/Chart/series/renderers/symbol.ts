import { compact, defaults, filter, get, map } from "lodash/fp"
import Series from "../series"
import * as styles from "./styles"
import { withD3Element } from "../../../utils/d3_utils"

import {
  symbol as d3Symbol,
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
} from "d3-shape"

import Events from "../../../shared/event_catalog"

import {
  SymbolRendererAccessors,
  D3Selection,
  Datum,
  EventBus,
  RendererAccessor,
  RendererClass,
  RendererType,
  SingleRendererOptions,
  State,
} from "../../typings"

const defaultAccessors: Partial<SymbolRendererAccessors> = {
  fill: (series: Series, d: Datum) => "#fff",
  size: (series: Series, d: Datum) => 50,
  stroke: (series: Series, d: Datum) => series.legendColor(),
  symbol: (series: Series, d: Datum) => "circle",
  opacity: (series: Series, d: Datum) => 0.8,
}

const symbolOptions: { [key: string]: any } = {
  circle: {
    symbol: symbolCircle,
  },
  cross: {
    symbol: symbolCross,
  },
  diamond: {
    symbol: symbolDiamond,
  },
  square: {
    symbol: symbolSquare,
  },
  squareDiamond: {
    symbol: symbolSquare,
    rotation: 45,
  },
  star: {
    symbol: symbolStar,
  },
  triangle: {
    symbol: symbolTriangle,
  },
}

export type Options = SingleRendererOptions<SymbolRendererAccessors>

class Symbol implements RendererClass<SymbolRendererAccessors> {
  data: Datum[]
  el: D3Selection
  events: EventBus
  options: Options
  series: Series
  state: any
  type: RendererType = "symbol"
  xIsBaseline: boolean
  xScale: any
  yScale: any
  // Accessors
  fill: RendererAccessor<string>
  focusContent: RendererAccessor<any>
  opacity: RendererAccessor<number>
  size: RendererAccessor<number>
  stroke: RendererAccessor<string>
  symbol: RendererAccessor<any>
  x: RendererAccessor<number | Date>
  y: RendererAccessor<number | Date>

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
    const data = filter(this.validate.bind(this))(this.data)
    const duration = this.state.current.get("config").duration

    const symbols = this.el.selectAll("path").data(data)

    symbols
      .enter()
      .append("svg:path")
      .attr(
        "d",
        (d: Datum): string =>
          d3Symbol()
            .type(this.symbol(d).symbol)
            .size(1)(),
      )
      .attr("transform", this.startTransform.bind(this))
      .merge(symbols)
      .on("mouseenter", withD3Element(this.onMouseOver.bind(this)))
      .on("mouseout", this.onMouseOut.bind(this))
      .on("click", withD3Element(this.onClick.bind(this)))
      .attr("fill", this.fill.bind(this))
      .attr("stroke", this.stroke.bind(this))
      .attr("opacity", this.opacity.bind(this))
      .transition()
      .duration(duration)
      .attr(
        "d",
        (d: Datum): string =>
          d3Symbol()
            .type(this.symbol(d).symbol)
            .size(this.size(d))(),
      )
      .attr("transform", this.transform.bind(this))

    symbols
      .exit()
      .transition()
      .duration(duration)
      .attr(
        "d",
        (d: Datum): string =>
          d3Symbol()
            .type(this.symbol(d).symbol)
            .size(1)(),
      )
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
    return el.append("g").attr("class", `series:${this.series.key()} ${styles.symbol}`)
  }

  private validate(d: Datum): boolean {
    return isFinite(this.xScale(this.x(d))) && isFinite(this.yScale(this.y(d)))
  }

  private assignAccessors(customAccessors: Partial<SymbolRendererAccessors>): void {
    const accessors = defaults(defaultAccessors)(customAccessors)
    this.x = (d: Datum): any => this.series.x(d) || d.injectedX
    this.y = (d: Datum): any => this.series.y(d) || d.injectedY
    this.fill = (d: Datum) => accessors.fill(this.series, d)
    this.focusContent = (d: Datum) =>
      accessors.focusContent ? accessors.focusContent(this.series, d) : this.defaultFocusContent(d)
    this.stroke = (d: Datum) => accessors.stroke(this.series, d)
    this.symbol = (d: Datum) => symbolOptions[accessors.symbol(this.series, d)]
    this.size = (d: Datum) => accessors.size(this.series, d)
    this.opacity = (d: Datum) => accessors.opacity(this.series, d)
  }

  defaultFocusContent(d: Datum): { name: string; value: any }[] {
    const xTitle = this.state.current.get("accessors").data.axes(this.state.current.get("data"))[this.series.xAxis()]
      .title
    const yTitle = this.state.current.get("accessors").data.axes(this.state.current.get("data"))[this.series.yAxis()]
      .title
    return [
      {
        name: xTitle || "X",
        value: this.x(d),
      },
      {
        name: yTitle || "Y",
        value: this.y(d),
      },
    ]
  }

  private setAxisScales(): void {
    this.xIsBaseline = this.state.current.get("computed").axes.baseline === "x"
    this.xScale = this.state.current.get(["computed", "axes", "computed", this.series.xAxis(), "scale"])
    this.yScale = this.state.current.get(["computed", "axes", "computed", this.series.yAxis(), "scale"])
  }

  private transform(d: Datum): string {
    const x = this.xScale(d.x1 || this.x(d))
    const y = this.yScale(d.y1 || this.y(d))
    return `translate(${x}, ${y}) rotate(${this.symbol(d).rotation || 0})`
  }

  private startTransform(d: Datum): string {
    const x = this.xScale(this.xIsBaseline ? d.x1 || this.x(d) : 0)
    const y = this.yScale(this.xIsBaseline ? 0 : d.y1 || this.y(d))
    return `translate(${x}, ${y})`
  }

  private onMouseOver(d: Datum, el: HTMLElement): void {
    const focusPoint = {
      content: this.focusContent(d),
      position: "toRight",
      offset: this.series.symbolOffset(d),
      focus: {
        x: this.xScale(this.x(d)),
        y: this.yScale(this.y(d)),
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
}

export default Symbol
