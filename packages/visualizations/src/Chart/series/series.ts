import Renderer from "./renderer"
import { compact, filter, find, flatten, flow, forEach, get, includes, invoke, isNil, map, uniqBy } from "lodash/fp"

import {
  D3Selection,
  Datum,
  EventBus,
  LegendDatum,
  RendererClass,
  SingleRendererOptions,
  RendererType,
  SeriesAccessor,
  State,
} from "../typings"

const hasValue = (d: any): boolean => {
  return !!d || d === 0
}

const defaultDatumAccessors = {
  x: (d: Datum): number | string | Date => d.x,
  y: (d: Datum): number | string | Date => d.y,
}

class ChartSeries {
  el: D3Selection
  events: EventBus
  oldRenderers: Renderer[]
  options: { [key: string]: any }
  renderers: Renderer[] = []
  state: any
  // Accessors
  data: () => Datum[] | { [key: string]: any }[]
  hide: () => boolean
  hideInLegend: () => boolean
  key: () => string
  legendColor: () => string
  legendName: () => string
  renderAs: () => SingleRendererOptions<any>[]
  symbolOffset: (d: Datum) => number
  xAxis: () => "x1" | "x2"
  yAxis: () => "y1" | "y2"
  x: (d: Datum) => number | string | Date
  y: (d: Datum) => number | string | Date

  constructor(state: State, events: EventBus, el: D3Selection, options: any) {
    this.state = state
    this.events = events
    this.el = el
    this.update(options)
  }

  update(options: any): void {
    this.assignAccessors(options.datumAccessors)
    this.options = options
    this.updateRenderers()
  }

  assignAccessors(datumAccessors: any): void {
    // Assign series accessors
    forEach.convert({ cap: false })((accessor: SeriesAccessor<any>, key: string) => {
      ;(this as any)[key] = () => accessor(this.options)
    })(this.state.current.get("accessors").series)
    // Assign series-specific datum accessors
    this.x = (datumAccessors && datumAccessors.x) || defaultDatumAccessors.x
    this.y = (datumAccessors && datumAccessors.y) || defaultDatumAccessors.y
  }

  private updateRenderers(): void {
    this.oldRenderers = []
    const rendererTypes = map(get("type"))(this.renderAs())
    this.removeAllExcept(rendererTypes)
    forEach(
      (options: SingleRendererOptions<any>): void => {
        const renderer: RendererClass<any> = this.get(options.type)
        renderer ? renderer.update(this.options.data, options) : this.addRenderer(options)
        if (options.type === "symbol") {
          this.symbolOffset = (d: Datum) => Math.ceil(Math.sqrt(((renderer || this.get(options.type)) as any).size(d)))
        }
      },
    )(this.renderAs())
  }

  private removeAllExcept(types: RendererType[]): void {
    flow(
      filter((renderer: RendererClass<any>): boolean => !includes(renderer.type)(types)),
      forEach(this.remove.bind(this)),
    )(this.renderers)
  }

  get(type: string): RendererClass<any> {
    return find({ type })(this.renderers)
  }

  private addRenderer(options: SingleRendererOptions<any>): void {
    this.renderers.push(new Renderer(this.state, this.events, this.el, this.options.data, options, this))
  }

  private remove(renderer: RendererClass<any>): void {
    this.oldRenderers.push(renderer)
    renderer.close()
    this.renderers = filter((r: RendererClass<any>) => r !== renderer)(this.renderers)
  }

  dataForLegend(): LegendDatum {
    return {
      color: this.legendColor(),
      label: this.legendName(),
      key: this.key(),
    }
  }

  dataForAxis(axis: "x" | "y") {
    const data = map((renderer: RendererClass<any>) => renderer.dataForAxis(axis))(this.renderers)
    return uniqBy(String)(compact(flatten(data)))
  }

  legendPosition(): "top" | "bottom" {
    return this.xAxis() === "x1" ? "top" : "bottom"
  }

  legendFloat(): "left" | "right" {
    return this.legendPosition() === "top" && this.yAxis() === "y2" ? "right" : "left"
  }

  getBarsInfo() {
    const barRenderer = find({ type: "bars" })(this.renderers)
    if (!barRenderer) {
      return
    }

    return {
      barWidth: (barRenderer as any).barWidth(),
      stackIndex: this.options.stackIndex,
    }
  }

  displayFocusPoint(): boolean {
    return (
      filter(
        (renderer: RendererClass<any>): boolean => {
          return renderer.type === "area" || renderer.type === "line"
        },
      )(this.renderers).length > 0
    )
  }

  hasFlags(): boolean {
    return !!this.get("flag")
  }

  hasData(): boolean {
    return !!this.data() && this.data().length > 0
  }

  valueAtFocus(focus: any): any {
    const xIsBaseline = this.state.current.get("computed").axes.baseline === "x"
    const baselineAccessor = (d: Datum) => (xIsBaseline ? this.x(d) || d.injectedX : this.y(d) || d.injectedY)
    const valueAccessor = xIsBaseline ? this.y : this.x
    const positionAccessor = (d: Datum) =>
      xIsBaseline ? (hasValue(d.y1) ? d.y1 : this.y(d)) : hasValue(d.x1) ? d.x1 : this.x(d)
    const valueScale = this.state.current.get([
      "computed",
      "axes",
      "computed",
      xIsBaseline ? this.yAxis() : this.xAxis(),
      "scale",
    ])
    const datum: Datum = find(
      (d: Datum): boolean => {
        return baselineAccessor(d).toString() === focus.toString()
      },
    )(this.data())

    return {
      value: !datum || isNil(valueAccessor(datum)) ? "-" : valueAccessor(datum),
      valuePosition: !datum || isNil(valueAccessor(datum)) ? undefined : valueScale(positionAccessor(datum)),
    }
  }

  draw(): void {
    forEach(invoke("draw"))(this.renderers)
  }

  private close(): void {
    forEach(invoke("close"))(this.renderers)
  }
}

export default ChartSeries
