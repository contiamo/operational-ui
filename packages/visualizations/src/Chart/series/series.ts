import Renderer from "./renderer"
import { compact, filter, find, flatten, flow, forEach, get, includes, invoke, map, remove, uniqBy } from "lodash/fp"
import {
  BarsRendererAccessors,
  D3Selection,
  Datum,
  EventBus,
  LegendDatum,
  Object,
  RendererClass,
  SingleRendererOptions,
  RendererType,
  SeriesAccessor,
  State,
} from "../typings"

class ChartSeries {
  el: D3Selection
  events: EventBus
  oldRenderers: Renderer[]
  options: Object<any>
  renderers: Renderer[] = []
  state: any
  // Accessors
  data: () => Datum[] | Object<any>[]
  hide: () => boolean
  hideInLegend: () => boolean
  key: () => string
  legendColor: () => string
  legendName: () => string
  renderAs: () => SingleRendererOptions<any>[]
  symbolOffset: (d: Datum) => number
  xAxis: () => "x1" | "x2"
  yAxis: () => "y1" | "y2"
  xAttribute: () => string
  yAttribute: () => string
  x: (d: Datum) => number | string | Date
  y: (d: Datum) => number | string | Date

  constructor(state: State, events: EventBus, el: D3Selection, options: Object<any>) {
    this.state = state
    this.events = events
    this.el = el
    this.update(options)
  }

  update(options: Object<any>): void {
    this.assignAccessors()
    this.options = options
    this.updateRenderers()
  }

  assignAccessors(): void {
    forEach.convert({ cap: false })((accessor: SeriesAccessor<any>, key: string) => {
      ;(this as any)[key] = (): any => accessor(this.options)
    })(this.state.current.get("accessors").series)
    this.x = (d: Datum) => d[this.xAttribute()]
    this.y = (d: Datum) => d[this.yAttribute()]
  }

  private updateRenderers(): void {
    this.oldRenderers = []
    const rendererTypes: RendererType[] = map(get("type"))(this.renderAs())
    this.removeAllExcept(rendererTypes)
    forEach((options: SingleRendererOptions<any>): void => {
      const renderer: RendererClass<any> = this.get(options.type)
      renderer ? renderer.update(this.options.data, options) : this.addRenderer(options)
      if (options.type === "symbol") {
        this.symbolOffset = (d: Datum) => Math.ceil(Math.sqrt(((renderer || this.get(options.type)) as any).size(d)))
      }
    })(this.renderAs())
  }

  private removeAllExcept(types: RendererType[]): void {
    flow(
      filter((renderer: RendererClass<any>): boolean => !includes(renderer.type)(types)),
      forEach(this.remove.bind(this))
    )(this.renderers)
  }

  get(type: string): RendererClass<any> {
    return find((renderer: RendererClass<any>): boolean => renderer.type === type)(this.renderers)
  }

  private addRenderer(options: SingleRendererOptions<any>): void {
    this.renderers.push(new Renderer(this.state, this.events, this.el, this.options.data, options, this))
  }

  private remove(renderer: RendererClass<any>): void {
    this.oldRenderers.push(renderer)
    renderer.close()
    remove(renderer)(this.renderers)
  }

  dataForLegend(): LegendDatum {
    return {
      color: this.legendColor(),
      label: this.legendName(),
      key: this.key(),
    }
  }

  dataForAxis(axis: "x" | "y"): any[] {
    const data: any[] = map((renderer: RendererClass<any>): any => renderer.dataForAxis(axis))(this.renderers)
    return uniqBy(String)(compact(flatten(data)))
  }

  legendPosition(): "top" | "bottom" {
    return this.xAxis() === "x1" ? "top" : "bottom"
  }

  legendFloat(): "left" | "right" {
    return this.legendPosition() === "top" && this.yAxis() === "y2" ? "right" : "left"
  }

  getBarsInfo(): Object<any> {
    const barRenderer: RendererClass<BarsRendererAccessors> = find(
      (renderer: RendererClass<any>): boolean => renderer.type === "bars"
    )(this.renderers)
    if (!barRenderer) {
      return
    }

    return {
      barWidth: (barRenderer as any).barWidth(),
      stackIndex: this.options.stackIndex,
    }
  }

  hasFlags(): boolean {
    return !!this.get("flag")
  }

  hasData(): boolean {
    return !!this.data() && this.data().length > 0
  }

  draw(): void {
    forEach(invoke("draw"))(this.renderers)
  }

  private close(): void {
    forEach(invoke("close"))(this.renderers)
  }
}

export default ChartSeries
