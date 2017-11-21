import AbstractCanvas from "../utils/canvas"
import * as d3 from "d3-selection"
import { forEach } from "lodash/fp"
import { IEvents, IState, TD3Selection, TSeriesEl, TStateWriter } from "./typings"
import * as styles from "../styles/styles"

class Canvas extends AbstractCanvas {
  focusEl: TD3Selection

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element) {
    super(state, stateWriter, events, context)
    this.focusEl = this.insertFocusLabel()
    this.appendDrawingGroups()
  }

  createEl(): TSeriesEl {
    const el: TD3Selection = d3.select(document.createElementNS(d3.namespaces["svg"], "svg"))
      .attr("class", "processflow")
    this.stateWriter("elRect", el.node().getBoundingClientRect())
    return el
  }

  insertFocusLabel(): TD3Selection {
    const focusEl = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.focusLegend}`)
      .style("visibility", "hidden")
    this.container.node().appendChild(focusEl.node())
    this.elMap.focus = focusEl
    return focusEl
  }

  appendDrawingGroups(): void {
    forEach((group: string): void => {
      this.el.append("svg:g")
        .attr("class", group + "-group")
    })(["links", "nodes"])
  }

  mouseOverElement(): TSeriesEl {
    return this.el
  }

}

export default Canvas
