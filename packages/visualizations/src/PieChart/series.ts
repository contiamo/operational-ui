// import DataHandler from "./data_handler"
import Renderer from "./renderers/renderer"

import {
  D3Selection,
  Data,
  Datum,
  EventBus,
  Renderer as RendererInterface,
  RendererOptions,
  State,
  StateWriter,
} from "./typings"

import { flow, filter, forEach } from "lodash/fp"

class Series {
  private attributes: any
  private data: Data
  private drawn: boolean
  private el: D3Selection
  private events: EventBus
  private renderAs: () => RendererOptions[]
  private renderer: RendererInterface
  private state: State
  private stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection) {
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

  private prepareData(): void {
    this.data = flow(
      filter(
        (datum: Datum): boolean => {
          return this.renderer.key(datum) && this.renderer.key(datum).length > 0 && this.renderer.value(datum) > 0
        },
      ),
    )(this.state.current.get("accessors").data.data(this.attributes))
    this.renderer.setData(this.data)
    this.stateWriter("data", this.data)
  }

  private assignAccessors(): void {
    const accessors = this.state.current.get("accessors").series
    forEach.convert({ cap: false })((accessor: any, key: string) => {
      ;(this as any)[key] = () => accessor(this.attributes)
    })(accessors)
  }

  private updateRenderer(): void {
    const options = this.renderAs()
    if (!options || options.length !== 1) {
      throw new Error(`Incorrect number of renderers: ${!options ? 0 : options.length} specified, 1 required`)
    }
    const rendererOptions = options[0]
    if (!this.renderer) {
      this.renderer = this.createRenderer(rendererOptions)
    } else if (this.renderer.type !== rendererOptions.type) {
      this.renderer.remove()
      this.renderer = this.createRenderer(rendererOptions)
    } else {
      this.renderer.updateOptions(rendererOptions)
    }
  }

  private createRenderer(options: RendererOptions): any {
    return new Renderer(this.state, this.events, this.el.select("g.drawing"), options)
  }

  draw(): void {
    this.renderer.draw()
    this.drawn = true
  }
}

export default Series
