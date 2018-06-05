import { drawHidden, labelDimensions, positionLabel } from "../utils/focus_utils"
import * as d3 from "d3-selection"
import Events from "../shared/event_catalog"
import { D3Selection, Datum, EventBus, Focus, HoverPayload, State, StateWriter } from "./typings"

const dataName = (d: Datum): string => d.data.name,
  dataValue = (d: Datum): number => d.value

class SunburstFocus implements Focus {
  private el: D3Selection
  private state: State
  private stateWriter: StateWriter
  private events: EventBus

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.HOVER, this.onElementHover.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.OUT, this.onElementOut.bind(this))
    this.events.on(Events.CHART.OUT, this.onMouseLeave.bind(this))
  }

  private onElementHover(payload: HoverPayload): void {
    this.remove()

    if (payload.hideLabel) {
      return
    }

    const computed = this.state.current.get("computed")
    const datum = payload.d
    const focusPoint = payload.focusPoint

    if (datum === computed.renderer.topNode) {
      return
    }

    drawHidden(this.el, "element")

    const content = this.el.append("xhtml:ul")

    content
      .append("span")
      .attr("class", "title")
      .text(dataName(datum))

    content.append("span").text(`(${this.state.current.get("config").numberFormatter(dataValue(datum))})`)

    const comparisonNode: Datum = computed.renderer.zoomNode || computed.renderer.topNode
    const percentage: string = ((dataValue(datum) * 100) / dataValue(comparisonNode)).toPrecision(3)
    content.append("xhtml:li").text(this.percentageString(datum))

    const focus = { x: focusPoint.centroid[0], y: focusPoint.centroid[1] }
    const labelDims = labelDimensions(this.el)
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
    const drawingDimensions = {
      xMin: 0,
      yMin: this.state.current.get("config").height - drawingDims.height,
      xMax: drawingDims.width,
      yMax: drawingDims.height,
    }

    positionLabel(
      this.el,
      focus,
      labelDims,
      drawingDimensions,
      this.state.current.get("config").focusOffset,
      focusPoint.labelPosition,
    )
  }

  private percentageString(datum: Datum): string {
    const computed = this.state.current.get("computed")
    const topNode = computed.renderer.topNode
    const zoomNode = computed.renderer.zoomNode
    return !zoomNode || topNode === zoomNode
      ? `${this.singlePercentageString(datum, topNode)}`
      : `${this.singlePercentageString(datum, zoomNode)} / ${this.singlePercentageString(datum, topNode)}`
  }

  private singlePercentageString(datum: Datum, comparison: Datum): string {
    const topNode: Datum = this.state.current.get("computed").renderer.topNode
    const percentage: string = ((dataValue(datum) * 100) / dataValue(comparison)).toPrecision(3)
    return `${percentage}% of ${dataName(comparison)}`
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

export default SunburstFocus
