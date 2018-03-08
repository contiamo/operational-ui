import DataHandler from "./data_handler"
import Renderer from "./renderer"
import { Data, EventBus, Object, SeriesEl, State, StateWriter } from "./typings"

class Series {
  data: Data
  dataHandler: DataHandler
  drawn: boolean
  el: SeriesEl
  events: EventBus
  renderer: Renderer
  state: State
  stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: SeriesEl) {
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
    this.stateWriter("data", this.data)
  }

  hasData(): boolean {
    return this.data.nodes != null && this.data.nodes.length > 0
  }

  draw(): void {
    const seriesConfig: Object<any> = this.state.current.get("computed").series
    this.el.attr("width", seriesConfig.width).attr("height", seriesConfig.height)
    this.renderer.draw(this.data)
    this.drawn = true
  }
}

export default Series
