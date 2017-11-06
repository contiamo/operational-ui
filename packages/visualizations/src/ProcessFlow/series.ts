import DataHandler from "./data_handler"
import Renderer from "./renderer"
import { IState, TStateWriter, IEvents, TSeriesEl, IData, IObject } from "./typings"

class Series {
  data: IData
  dataHandler: DataHandler
  drawn: boolean
  el: TSeriesEl
  events: IEvents
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
    this.stateWriter("data", this.data)
  }

  hasData(): boolean {
    return this.data.nodes != null && this.data.nodes.length > 0
  }

  draw(): void {
    const seriesConfig: IObject = this.state.current.get("computed").series
    this.el.attr("width", seriesConfig.width).attr("height", seriesConfig.height)
    this.renderer.draw(this.data)
    this.drawn = true
  }
}

export default Series
