import FocusUtils from "../utils/focus_utils"
import * as d3 from "d3-selection"
import Events from "../utils/event_catalog"
import {
  D3Selection,
  Datum,
  EventBus,
  Focus,
  FocusPoint,
  HoverPayload,
  Object,
  SeriesEl,
  State,
  StateWriter
} from "./typings"

const dataName = (d: Datum): string => d.data.name,
  dataValue = (d: Datum): number => d.value

class SunburstFocus implements Focus {
  el: SeriesEl
  state: State
  stateWriter: StateWriter
  events: EventBus

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOVER, this.onElementHover.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOUT, this.onElementOut.bind(this))
    this.events.on(Events.CHART.MOUSEOUT, this.onMouseLeave.bind(this))
  }

  private onElementHover(payload: HoverPayload): void {
    this.remove()

    if (payload.hideLabel) {
      return
    }

    const computed: Object<any> = this.state.current.get("computed")
    if (payload.d === computed.renderer.topNode) {
      return
    }

    const focusPoint: FocusPoint = payload.focusPoint,
      datum: Datum = payload.d

    FocusUtils.drawHidden(this.el, "element", "above")

    const content: D3Selection = this.el.append("xhtml:ul")

    content
      .append("span")
      .attr("class", "title")
      .text(dataName(datum))

    content.append("span").text(`(${this.state.current.get("config").numberFormatter(dataValue(datum))})`)

    const comparisonNode: Datum = computed.renderer.zoomNode || computed.renderer.topNode
    const percentage: string = (dataValue(datum) * 100 / dataValue(comparisonNode)).toPrecision(3)
    content.append("xhtml:li").text(this.percentageString(datum))

    // Get label dimensions
    const labelDimensions: { height: number; width: number } = FocusUtils.labelDimensions(this.el),
      labelPlacement: { left: number; top: number } = {
        left: focusPoint.centroid[0] - labelDimensions.width / 2,
        top: focusPoint.centroid[1]
      }

    FocusUtils.drawVisible(this.el, labelPlacement)
  }

  private percentageString(datum: Datum): string {
    const computed: Object<any> = this.state.current.get("computed")
    const topNode: Datum = computed.renderer.topNode
    const zoomNode: Datum = computed.renderer.zoomNode
    return !zoomNode || topNode === zoomNode
      ? `${this.singlePercentageString(datum, topNode)}`
      : `${this.singlePercentageString(datum, zoomNode)} / ${this.singlePercentageString(datum, topNode)}`
  }

  private singlePercentageString(datum: Datum, comparison: Datum): string {
    const topNode: Datum = this.state.current.get("computed").renderer.topNode
    const percentage: string = (dataValue(datum) * 100 / dataValue(comparison)).toPrecision(3)
    return `${percentage}% of ${dataName(comparison)}`
  }

  private onElementOut(): void {
    this.remove()
  }

  private onMouseLeave(): void {
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)
  }

  remove(): void {
    this.el.node().innerHTML = ""
    this.el.style("visibility", "hidden")
  }
}

export default SunburstFocus
