import { drawHidden, labelDimensions, positionLabel } from "../utils/focus_utils"
import Events from "../shared/event_catalog"
import ComponentFocus from "../shared/component_focus"
import * as d3 from "d3-selection"
import { D3Selection, EventBus, Focus, HoverPayload, State, StateWriter } from "./typings"

const percentageString = (percentage: number): string => percentage.toFixed(1) + "%"

class PieChartFocus implements Focus {
  private el: D3Selection
  private componentFocus: ComponentFocus
  private state: State
  private stateWriter: StateWriter
  private events: EventBus

  constructor(state: State, stateWriter: StateWriter, events: EventBus, els: { [key: string]: D3Selection }) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = els.main
    this.componentFocus = new ComponentFocus(this.state, els.component, this.events)
    this.events.on(Events.FOCUS.ELEMENT.HOVER, this.onElementHover.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.OUT, this.onElementOut.bind(this))
    this.events.on(Events.CHART.OUT, this.onMouseLeave.bind(this))
    this.events.on(Events.FOCUS.CLEAR, this.remove())
  }

  private onElementHover(payload: HoverPayload): void {
    this.remove()

    drawHidden(this.el, "element")

    const label = this.el.append("xhtml:ul")

    label
      .append("xhtml:li")
      .attr("class", "title")
      .text(payload.d.key)

    label
      .append("xhtml:li")
      .attr("class", "series")
      .html(
        `<span class="value">${payload.d.value}</span>
        <span class="percentage">(${percentageString(payload.d.percentage)})</span>`,
      )

    const labelDims = labelDimensions(this.el)
    const drawingContainerDims = this.state.current.get("computed").canvas.drawingContainerDims

    const drawingDimensions = {
      xMin: 0,
      yMin: this.state.current.get("config").height - drawingContainerDims.height,
      xMax: drawingContainerDims.width,
      yMax: this.state.current.get("config").height,
    }

    const focus = { x: payload.focusPoint.centroid[0], y: payload.focusPoint.centroid[1] }
    positionLabel(this.el, focus, labelDims, drawingDimensions, this.state.current.get("config").focusOffset, "above")
  }

  private onElementOut(): void {
    this.remove()
  }

  private onMouseLeave(): void {
    this.events.emit(Events.FOCUS.ELEMENT.OUT)
  }

  remove(): void {
    this.el.node().innerHTML = ""
    this.el.style("visibility", "hidden")
  }
}

export default PieChartFocus
