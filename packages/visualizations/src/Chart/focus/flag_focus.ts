import FocusUtils from "../../utils/focus_utils"
import Events from "../../utils/event_catalog"
import { AxisPosition, Computed, D3Selection, Dimensions, EventBus, Object, Position, State } from "../typings"
import * as d3 from "d3-selection"
import * as styles from "./styles"

class FlagFocus {
  events: EventBus
  state: State
  el: D3Selection
  label: D3Selection

  constructor(state: State, el: D3Selection, events: EventBus) {
    this.state = state
    this.el = el
    this.events = events
    this.events.on(Events.FOCUS.FLAG.HOVER, this.draw.bind(this))
    this.events.on(Events.FOCUS.FLAG.OUT, this.remove.bind(this))
  }

  // Focus Label (hidden initially)
  private draw(focusData: any): void {
    // Remove old focus (may also be a different type of focus)
    this.events.emit(Events.FOCUS.CLEAR)

    this.el.classed("flag", true).style("max-width", this.state.current.get("config").maxFocusLabelWidth)

    const position =
      focusData.axis[0] === "x"
        ? focusData.direction === "up" ? "toRight" : "toLeft"
        : focusData.direction === "up" ? "above" : "below"

    FocusUtils.drawHidden(this.el, "flag", position)

    const content: D3Selection = this.el.append("xhtml:ul").attr("class", styles.flagFocus)

    const name: string =
      focusData.axisType !== "quant"
        ? `${focusData.formatter(focusData.datum)}: ${focusData.label}`
        : `${focusData.label}: ${focusData.formatter(focusData.datum)}`

    content
      .append("xhtml:li")
      .attr("class", "name")
      .html(name)

    content
      .append("xhtml:li")
      .attr("class", "description")
      .html(focusData.description)

    // Draw line between label title and description.
    content.select("li.name").style("border-bottom", `1px solid ${focusData.color}`)

    // Get label dimensions
    const labelDimensions: Dimensions = FocusUtils.labelDimensions(this.el)
    const drawingDimensions: { xMax: number; xMin: number; yMax: number; yMin: number } = this.getDrawingDimensions()
    const offset: number = this.state.current.get("config").flagFocusOffset

    const labelPosition: Position = {
      left: focusData.x + this.margin("y1") + this.focusDX(focusData, labelDimensions.width, offset),
      top: focusData.y + this.margin("x2") + this.focusDY(focusData, labelDimensions.height, offset),
    }

    FocusUtils.drawVisible(this.el, labelPosition)
  }

  private margin(axis: AxisPosition): number {
    return this.state.current.get("computed").axes.margins[axis] || this.state.current.get("config")[axis].margin
  }

  private focusDX(focusData: any, width: number, offset: number): number {
    switch (focusData.axis) {
      case "y1":
        return -width
      case "y2":
        return 0
      default:
        return focusData.direction === "up" ? offset : -(width + offset)
    }
  }

  private focusDY(focusData: any, height: number, offset: number): number {
    switch (focusData.axis) {
      case "x1":
        return 0
      case "x2":
        return -height
      default:
        return focusData.direction === "up" ? -(height + offset) : offset
    }
  }

  private getDrawingDimensions(): { xMax: number; xMin: number; yMax: number; yMin: number } {
    const computed: Computed = this.state.current.get("computed")
    const margins: Object<number> = computed.axes.margins
    return {
      xMin: margins.y1,
      xMax: margins.y1 + computed.canvas.drawingDims.width,
      yMin: this.state.current.get("config").height - computed.canvas.drawingContainerDims.height + margins.x2,
      yMax:
        this.state.current.get("config").height -
        computed.canvas.drawingContainerDims.height +
        margins.x2 +
        computed.canvas.drawingDims.height,
    }
  }

  remove(): void {
    this.el.classed("focus-legend-flag", false)
    this.el.node().innerHTML = ""
    this.el.style("visibility", "hidden")
  }
}

export default FlagFocus
