import DataHandler from "./data_handler"
import Renderer from "./renderer"
import Events from "../utils/event_catalog"
import { invoke, map, find, isMatch, filter, keys } from "lodash/fp"
import * as $ from "jquery"
import * as d3 from "d3-selection"

class Series {
  data: any
  dataHandler: any
  drawingContainer: any
  drawn: boolean
  el: any
  renderer: Renderer

  constructor(options: any = {}) {
    this.dataHandler = new DataHandler()
    this.renderer = new Renderer()
    this.drawn = false
  }

  setData(computed: any, data: any, accessors: any): void {
    this.data = this.dataHandler.prepareData(data, accessors)
    computed.data = this.data
  }

  hasData(): boolean {
    return this.data.nodes != null && this.data.nodes.length > 0
  }

  draw(computed: any, config: any): void {
    if (!this.hasData()) {
      this.renderer.close()
    } else {
      this.prepareDraw(computed, config)
    }
  }

  prepareDraw(computed: any, config: any): void {
    this.drawn ? this.updateDraw(computed, config) : this.initialDraw(computed, config)
  }

  initialDraw(computed: any, config: any): void {
    this.el = computed.el
    this.updateDraw(computed, config)
    this.drawn = true
  }

  updateDraw(computed: any, config: any): void {
    this.el.attr("width", config.width).attr("height", config.height)
    computed.el = this.el
    this.renderer.draw(computed, config)
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
