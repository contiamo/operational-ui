// import DataHandler from "./data_handler"
import Renderer from "./renderers/renderer"
import AbstractRenderer from "./renderers/abstract_renderer"
import { TDatum, IEvents, IObject, ISeriesAccessors, IState, TSeriesEl, TStateWriter } from "./typings"
import { flow, filter, forEach } from "lodash/fp"

class Series {
  attributes: IObject
  data: TDatum[]
  drawn: boolean
  el: TSeriesEl
  events: IEvents
  renderAs: () => IObject[]
  renderer: AbstractRenderer
  state: IState
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TSeriesEl) {
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
      filter((datum: IObject): boolean => {
        return this.renderer.key(datum) && this.renderer.key(datum).length > 0 && this.renderer.value(datum) > 0
      })
    )(this.state.current.get("accessors").data.data(this.attributes))
    this.renderer.setData(this.data)
    this.stateWriter("data", this.data)
  }

  assignAccessors(): void {
    const accessors: ISeriesAccessors = this.state.current.get("accessors").series
    forEach.convert({ cap: false })((accessor: any, key: string) => {
      ;(this as any)[key] = () => accessor(this.attributes)
    })(accessors)
  }

  updateRenderer(): void {
    const options: IObject[] = this.renderAs()
    if (!options || options.length !== 1) {
      throw new Error(`Incorrect number of renderers: ${!options ? 0 : options.length} specified, 1 required`)
    }
    const rendererOptions: IObject = options[0]
    if (!this.renderer) {
      this.renderer = this.createRenderer(rendererOptions)
    } else if (this.renderer.type !== rendererOptions.type) {
      this.renderer.remove()
      this.renderer = this.createRenderer(rendererOptions)
    } else {
      this.renderer.assignOptions(rendererOptions)
    }
  }

  createRenderer(options: IObject): any {
    return new Renderer(this.state, this.events, this.el, options)
  }

  hasData(): boolean {
    return this.data.length > 0
  }

  draw(): void {
    const seriesConfig: IObject = this.state.current.get("computed").series
    this.renderer.draw()
    this.drawn = true
  }
}

export default Series
