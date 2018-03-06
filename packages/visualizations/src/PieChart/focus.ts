import FocusUtils from "../utils/focus_utils"
import Events from "../utils/event_catalog"
import ComponentFocus from "../utils/component_focus"
import * as d3 from "d3-selection"
import { IEvents, IObject, IState, TD3Selection, TDatum, TSeriesEl, TStateWriter } from "./typings"

const percentageString = (percentage: number): string => percentage.toFixed(1) + "%"

class Focus {
  el: TSeriesEl
  componentFocus: ComponentFocus
  state: IState
  stateWriter: TStateWriter
  events: IEvents

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, els: IObject) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = els.main
    this.componentFocus = new ComponentFocus(this.state, els.component, this.events)
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOVER, this.onElementHover.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOUT, this.onElementOut.bind(this))
    this.events.on(Events.CHART.MOUSEOUT, this.onMouseLeave.bind(this))
  }

  onElementHover(payload: { focusPoint: IObject; d: IObject }): void {
    this.remove()

    FocusUtils.drawHidden(this.el, "element")

    const content: TD3Selection = this.el.append("xhtml:ul")

    content
      .append("xhtml:li")
      .attr("class", "title")
      .text(payload.d.key)

    content
      .append("xhtml:li")
      .attr("class", "series")
      .html(
        `<span class="value">${payload.d.value}</span>
        <span class="percentage">(${percentageString(payload.d.percentage)})</span>`
      )

    // Get label dimensions
    const labelDimensions: { height: number; width: number } = FocusUtils.labelDimensions(this.el),
      labelPlacement: { left: number; top: number } = {
        left: payload.focusPoint.centroid[0] - labelDimensions.width / 2,
        top: payload.focusPoint.centroid[1]
      }

    FocusUtils.drawVisible(this.el, labelPlacement)
  }

  onElementOut(): void {
    this.remove()
  }

  onMouseLeave(): void {
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)
  }

  remove(): void {
    this.el.node().innerHTML = ""
    this.el.style("visibility", "hidden")
  }
}

export default Focus
