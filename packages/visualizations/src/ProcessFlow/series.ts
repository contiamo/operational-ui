import DataHandler from "./data_handler"
import Renderer from "./renderer"
import { invoke } from "lodash/fp"
import { TState, TStateWriter } from "./typings"

class Series {
  data: any
  dataHandler: any
  drawingContainer: any
  drawn: boolean
  el: any
  renderer: Renderer
  state: TState
  stateWriter: TStateWriter

  constructor(state: TState, stateWriter: TStateWriter, options: any = {}) {
    this.state = state
    this.stateWriter = stateWriter
    this.dataHandler = new DataHandler(state)
    this.renderer = new Renderer(state)
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
    if (!this.hasData()) {
      this.renderer.close()
    } else {
      this.prepareDraw()
    }
  }

  prepareDraw(): void {
    this.drawn ? this.updateDraw() : this.initialDraw()
  }

  initialDraw(): void {
    this.el = this.state.current.computed.el
    this.updateDraw()
    this.drawn = true
  }

  updateDraw(): void {
    const config = this.state.current.config
    this.el.attr("width", config.width).attr("height", config.height)
    this.stateWriter("el", this.el)
    this.renderer.draw()
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
