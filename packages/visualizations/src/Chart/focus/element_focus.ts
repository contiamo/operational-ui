import { D3Selection, EventBus, HoverPayload, State } from "../typings"
import Events from "../../shared/event_catalog"
import { drawHidden, labelDimensions, positionLabel } from "../../utils/focus_utils"
import * as styles from "./styles"
import * as globalStyles from "../../shared/styles"
import { identity, isFinite, forEach } from "lodash/fp"

class ElementFocus {
  el: D3Selection
  els: { [key: string]: D3Selection }
  events: EventBus
  state: State

  constructor(state: State, els: { [key: string]: D3Selection }, events: EventBus) {
    this.state = state
    this.el = els.main
    this.els = els
    this.events = events
    this.events.on(Events.FOCUS.ELEMENT.HOVER, this.onMouseOver.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.OUT, this.remove.bind(this))
  }

  private onMouseOver(payload: HoverPayload) {
    const computedAxes = this.state.current.get("computed").axes
    // Only render a date focus if there isn't a time axis
    const timeAxis = computedAxes.priorityTimeAxis
    if (timeAxis) {
      return
    }

    // If a component focus or flag focus is being displayed, do not render a date focus
    if (
      this.els.component.select(`div.${globalStyles.componentFocus}`).style("visibility") === "visible" ||
      this.el.classed("focus-legend-flag")
    ) {
      return
    }

    this.renderFocusLabel(payload)
  }

  private renderFocusLabel(payload: HoverPayload): void {
    // Remove old focus (may also be a different type of focus)
    this.events.emit(Events.FOCUS.CLEAR)

    drawHidden(this.el, "element")

    const label = this.el.append("xhtml:ul").attr("class", styles.elementFocus)

    forEach(
      (item: { name: string; value: any }): void => {
        const formatter = isFinite(item.value) ? this.state.current.get(["config", "numberFormatter"]) : identity
        const listItem = label.append("xhtml:li")

        listItem
          .append("span")
          .attr("class", "name")
          .text(item.name)

        listItem
          .append("span")
          .attr("class", "value")
          .text(formatter(item.value))
      },
    )(payload.content)

    // Get label dimensions
    const labelDims = labelDimensions(this.el)
    const drawingDimensions = this.state.current.get("computed").canvas.drawingDims
    const offset = this.state.current.get("config").focusOffset + payload.offset

    positionLabel(this.el, payload.focus, labelDims, this.getDrawingPosition(), offset, payload.position, true)
  }

  private getDrawingPosition() {
    const computed = this.state.current.get("computed")
    const margins = computed.axes.margins
    return {
      xMin: margins.y1,
      xMax: margins.y1 + computed.canvas.drawingDims.width,
      yMin: margins.x2,
      yMax: margins.x2 + computed.canvas.drawingDims.height,
    }
  }

  remove(): void {
    this.el.node().innerHTML = ""
    this.el.style("visibility", "hidden")
  }
}

export default ElementFocus
