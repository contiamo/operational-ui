import DataHandler from "./data_handler"
import Renderer from "./renderer"
import { invoke } from "lodash/fp"
import { TState } from "./typings"

class Series {
  data: any
  dataHandler: any
  drawingContainer: any
  drawn: boolean
  el: any
  renderer: Renderer
  state: TState

  constructor(state: TState, options: any = {}) {
    this.state = state
    this.dataHandler = new DataHandler(state)
    this.renderer = new Renderer(state)
    this.drawn = false
  }

  prepareData(): void {
    this.data = this.dataHandler.prepareData(this.state)
    this.state.computed("data", this.data)
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
    this.el = this.state.computed("el")
    this.updateDraw()
    this.drawn = true
  }

  updateDraw(): void {
    const config = this.state.config()
    this.el.attr("width", config.width).attr("height", config.height)
    this.state.computed("el", this.el)
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
