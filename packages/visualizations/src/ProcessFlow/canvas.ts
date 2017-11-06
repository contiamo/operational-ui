import AbstractCanvas from "../utils/abstract_canvas"
import * as d3 from "d3-selection"
import { forEach } from "lodash/fp"
import { TSeriesEl, TD3Selection } from "./typings"

class Canvas extends AbstractCanvas {
  createEl(): TSeriesEl {
    const el: TD3Selection = d3.select(document.createElementNS(d3.namespaces["svg"], "svg"))
      .attr("class", "processflow")
    this.stateWriter("elRect", el.node().getBoundingClientRect())
    return el
  }

  createInitialElements(): void {
    this.insertDrawingGroups()
    this.insertFocusLabel()
  }

  insertDrawingGroups(): void {
    forEach((group: string): void => {
      this.el.append("svg:g")
        .attr("class", group + "-group")
    })(["links", "nodes"])
  }

  draw(): void {
    const config = this.state.current.get("config"),
      series = this.state.current.get("computed").series

    this.container.style("width", series.width + "px").style("height", series.height + "px")
    this.el.style("width", series.width + "px").style("height", series.height + "px")
    this.container.classed("hidden", config.hidden)
  }

  mouseOverElement(): TSeriesEl {
    return this.el
  }

}

export default Canvas
