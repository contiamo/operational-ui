import AbstractCanvas from "../utils/abstract_canvas"
import * as d3 from "d3-selection"
import { forEach } from "lodash/fp"

class Canvas extends AbstractCanvas {
  createEl(): d3.Selection<Element, null, Window, undefined> {
    const el: any = d3.select(document.createElementNS(d3.namespaces["svg"], "svg")).attr("class", "processflow")
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

  //
  // mouseOverElement(): d3.Selection<Node> {
  //   return this.el
  // }
  //
}

export default Canvas
