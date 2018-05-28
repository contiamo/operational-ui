import FocusUtils from "../utils/focus_utils"
import Events from "../utils/event_catalog"
import ComponentFocus from "../utils/component_focus"
import * as d3 from "d3-selection"
import {
  D3Selection,
  Dimensions,
  EventBus,
  Focus,
  HoverPayload,
  Object,
  Point,
  Position,
  SeriesEl,
  State,
  StateWriter,
} from "./typings"

const percentageString = (percentage: number): string => percentage.toFixed(1) + "%"

class PieChartFocus implements Focus {
  private el: SeriesEl
  private componentFocus: ComponentFocus
  private state: State
  private stateWriter: StateWriter
  private events: EventBus

  constructor(state: State, stateWriter: StateWriter, events: EventBus, els: Object<D3Selection>) {
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

    FocusUtils.drawHidden(this.el, "element", "above")

    const content: D3Selection = this.el.append("xhtml:ul")

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

    const labelDimensions: Dimensions = FocusUtils.labelDimensions(this.el)
    const drawingContainerRect = this.state.current.get("computed").canvas.drawingContainerRect
    const drawingDimensions = {
      xMin: drawingContainerRect.x,
      yMin: drawingContainerRect.y,
      xMax: drawingContainerRect.right,
      yMax: drawingContainerRect.bottom,
    }

    const focus: Point = { x: payload.focusPoint.centroid[0], y: payload.focusPoint.centroid[1] }
    FocusUtils.positionLabel(
      this.el,
      focus,
      labelDimensions,
      drawingDimensions,
      this.state.current.get("config").focusOffset,
      "above"
    )
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
