// import DataHandler from "./data_handler"
import Renderer from "./renderers/renderer"
import AbstractRenderer from "./renderers/abstract_renderer"
import {
  Data,
  Datum,
  EventBus,
  Object,
  RendererOptions,
  SeriesAccessors,
  SeriesEl,
  State,
  StateWriter
} from "./typings"
import { flow, filter, forEach } from "lodash/fp"

class Series {
  // @TODO really?? Should be "any"
  attributes: Data
  data: Data
  drawn: boolean
  el: SeriesEl
  events: EventBus
  renderAs: () => RendererOptions[]
  renderer: AbstractRenderer
  state: State
  stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: SeriesEl) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.drawn = false
  }

  assignData(): void {
    this.attributes = this.state.current.get("data")
    this.assignAccessors()
    this.updateRenderer()
    this.prepareData()
    this.stateWriter("dataForLegend", this.renderer.dataForLegend())
  }

  prepareData(): void {
    this.data = flow(
      filter((datum: Datum): boolean => {
        return this.renderer.key(datum) && this.renderer.key(datum).length > 0 && this.renderer.value(datum) > 0
      })
    )(this.state.current.get("accessors").data.data(this.attributes))
    this.renderer.setData(this.data)
    this.stateWriter("data", this.data)
  }

  assignAccessors(): void {
    const accessors: SeriesAccessors = this.state.current.get("accessors").series
    forEach.convert({ cap: false })((accessor: any, key: string) => {
      ;(this as any)[key] = () => accessor(this.attributes)
    })(accessors)
  }

  updateRenderer(): void {
    const options: RendererOptions[] = this.renderAs()
    if (!options || options.length !== 1) {
      throw new Error(`Incorrect number of renderers: ${!options ? 0 : options.length} specified, 1 required`)
    }
    const rendererOptions: RendererOptions = options[0]
    if (!this.renderer) {
      this.renderer = this.createRenderer(rendererOptions)
    } else if (this.renderer.type !== rendererOptions.type) {
      this.renderer.remove()
      this.renderer = this.createRenderer(rendererOptions)
    } else {
      this.renderer.assignOptions(rendererOptions)
    }
  }

  createRenderer(options: RendererOptions): any {
    return new Renderer(this.state, this.events, this.el, options)
  }

  draw(): void {
    this.renderer.draw()
    this.drawn = true
  }
}

export default Series
