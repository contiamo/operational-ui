import Renderer from "./renderer"
import {
  compact,
  filter,
  find,
  flatten,
  flow,
  forEach,
  get,
  includes,
  invoke,
  map,
  reduce,
  remove,
  uniqBy
} from "lodash/fp"
import {
  Accessor,
  D3Selection,
  DataForLegends,
  Datum,
  EventBus,
  LegendDatum,
  RendererClass,
  RendererOptions,
  RendererType,
  SeriesAccessor,
  SeriesAccessors,
  SeriesOptions,
  State,
  StateWriter
} from "../typings"

class ChartSeries {
  el: D3Selection
  events: EventBus
  oldRenderers: Renderer[]
  options: SeriesOptions
  renderers: Renderer[] = []
  state: any
  stateWriter: StateWriter
  // Accessors
  data: () => Datum[] | SeriesOptions[]
  hide: () => boolean
  hideInLegend: () => boolean
  key: () => string
  legendColor: () => string
  legendName: () => string
  renderAs: () => RendererOptions<any>[]
  unit: () => string
  xAxis: () => "x1" | "x2"
  yAxis: () => "y1" | "y2"

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection, options: SeriesOptions) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.update(options)
  }

  update(options: SeriesOptions): void {
    this.assignAccessors()
    this.options = options
    this.updateRenderers()
  }

  private assignAccessors(): void {
    const accessors: SeriesAccessors = this.state.current.get("accessors").series
    forEach.convert({ cap: false })((accessor: SeriesAccessor<any>, key: string) => {
      ;(this as any)[key] = (): any => accessor(this.options)
    })(accessors)
  }

  updateRenderers(): void {
    this.oldRenderers = []
    const rendererTypes: RendererType[] = map(get("type"))(this.renderAs())
    this.removeAllExcept(rendererTypes)
    forEach((options: RendererOptions<any>): void => {
      // @TODO typing
      const renderer: RendererClass<any> = this.get(options.type)
      renderer ? renderer.update(this.options.data, options) : this.addRenderer(options)
    })(this.renderAs())
  }

  removeAllExcept(types: RendererType[]): void {
    flow(filter((renderer: RendererClass<any>): boolean => !includes(renderer.type)(types)), forEach(this.remove))(
      this.renderers
    )
  }

  get(type: string): RendererClass<any> {
    return find((renderer: RendererClass<any>): boolean => renderer.type === type)(this.renderers)
  }

  addRenderer(options: RendererOptions<any>): void {
    this.renderers.push(new Renderer(this.state, this.events, this.el, this.options.data, options, this))
  }

  remove(renderer: Renderer): void {
    this.oldRenderers.push(renderer)
    remove(renderer)(this.renderers)
  }

  dataForLegend(): LegendDatum {
    return {
      color: this.legendColor(),
      label: this.legendName()
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

  draw(): void {
    forEach(invoke("draw"))(this.renderers)
  }

  close(): void {
    forEach(invoke("close"))(this.renderers)
  }
}

export default ChartSeries
