import DataHandler from "./data_handler"
import Renderer from "./renderer"
import { IState, TStateWriter, TEvents, TSeriesEl } from "./typings"

class Series {
  data: any
  dataHandler: any
  drawn: boolean
  el: TSeriesEl
  events: TEvents
  renderer: Renderer
  state: IState
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: TEvents, el: TSeriesEl) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.dataHandler = new DataHandler(state, stateWriter)
    this.renderer = new Renderer(state, events, el)
    this.drawn = false
  }

  prepareData(): void {
    this.data = this.dataHandler.prepareData(this.state)
    this.stateWriter("data", this.data)
  }

  hasData(): boolean {
    return this.data.nodes != null && this.data.nodes.length > 0
  }

  draw(): void {
    const seriesConfig = this.state.current.get("computed").series
    this.el.attr("width", seriesConfig.width).attr("height", seriesConfig.height)
    this.renderer.draw(this.data)
    this.drawn = true
  }
}

export default Series
