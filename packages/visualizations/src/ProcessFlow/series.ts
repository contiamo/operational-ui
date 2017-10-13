import DataHandler from "./data_handler"
import Renderer from "./renderer"
import { invoke } from "lodash/fp"
import { TState, TStateWriter, TEvents, TSeriesEl } from "./typings"

class Series {
  data: any
  dataHandler: any
  drawingContainer: any
  drawn: boolean
  el: TSeriesEl
  events: TEvents
  renderer: Renderer
  state: TState
  stateWriter: TStateWriter

  constructor(state: TState, stateWriter: TStateWriter, events: TEvents, el: TSeriesEl) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.dataHandler = new DataHandler(state)
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
    const config = this.state.current.get("config")
    this.el.attr("width", config.width).attr("height", config.height)
    this.renderer.draw()
    this.drawn = true
  }

  //
  // resize(): void {
  //   this.updateDraw()
  //   this.draw()
  // }

  // close(): void {
  //   if (this.drawn) {
  //     this.renderer.close()
  //     invoke("remove")(this.el)
  //     this.drawn = false
  //   }
  // }
}

export default Series
