import DataHandler from "./data_handler"
import Renderer from "./renderer"
import { TDatum, IEvents, IObject, IState, TSeriesEl, TStateWriter } from "./typings"
import { flow, filter, forEach } from "lodash/fp"

class Series {
  attributes: IObject
  data: TDatum[]
  dataHandler: DataHandler
  drawn: boolean
  el: TSeriesEl
  events: IEvents
  renderOptions: () => IObject[]
  renderer: Renderer
  state: IState
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TSeriesEl) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.dataHandler = new DataHandler(state, stateWriter)
    this.renderer = new Renderer(state, events, el)
    this.drawn = false
  }

  prepareData(): void {
    this.data = this.dataHandler.prepareData()
  }

  hasData(): boolean {
    return this.data.length > 0
  }

  draw(): void {
    this.renderer.draw()
    this.drawn = true
  }
}

export default Series
