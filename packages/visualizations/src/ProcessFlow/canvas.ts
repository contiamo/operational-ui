import AbstractCanvas from "../utils/abstract_canvas"
import * as d3 from "d3-selection"

class Canvas extends AbstractCanvas {
  createEl(): d3.Selection<Element, null, Window, undefined> {
    const el: any = d3.select(document.createElementNS(d3.namespaces["svg"], "svg")).attr("class", "processflow")
    return el
  }

  createInitialElements(): void {
    this.defineMarker()
  }

  defineMarker(): void {
    // Add arrow marker definition for link paths
    this.el
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "-7 -6 14 12")
      .attr("markerWidth", 16)
      .attr("markerHeight", 12)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M-5,-5L5,0L-5,5")
  }
  //
  // mouseOverElement(): d3.Selection<Node> {
  //   return this.el
  // }
  //
}

export default Canvas
