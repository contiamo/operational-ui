import FocusUtils from "../utils/focus_utils"
import * as d3 from "d3-selection"
import Events from "../utils/event_catalog"
import { Focus, IEvents, IObject, IState, TD3Selection, TDatum, TSeriesEl, TStateWriter } from "./typings"

const dataName = (d: TDatum): string => d.data.name,
  dataValue = (d: TDatum): number => d.value

class SunburstFocus implements Focus {
  el: TSeriesEl
  state: IState
  stateWriter: TStateWriter
  events: IEvents

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TD3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOVER, this.onElementHover.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOUT, this.onElementOut.bind(this))
    this.events.on(Events.CHART.MOUSEOUT, this.onMouseLeave.bind(this))
  }

  onElementHover(payload: { focusPoint: IObject; d: TDatum; hideLabel?: boolean }): void {
    this.remove()

    if (payload.hideLabel) {
      return
    }

    const computed: IObject = this.state.current.get("computed")
    if (payload.d === computed.renderer.topNode) {
      return
    }

    const focusPoint: IObject = payload.focusPoint,
      datum: TDatum = payload.d

    FocusUtils.drawHidden(this.el, "element", "above")

    const content: TD3Selection = this.el.append("xhtml:ul")

    content
      .append("span")
      .attr("class", "title")
      .text(dataName(datum))

    content.append("span").text(`(${this.state.current.get("config").numberFormatter(dataValue(datum))})`)

    const comparisonNode: TDatum = computed.renderer.zoomNode || computed.renderer.topNode
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

  percentageString(datum: TDatum): string {
    const computed: IObject = this.state.current.get("computed")
    const topNode: TDatum = computed.renderer.topNode
    const zoomNode: TDatum = computed.renderer.zoomNode
    return !zoomNode || topNode === zoomNode
      ? `${this.singlePercentageString(datum, topNode)}`
      : `${this.singlePercentageString(datum, zoomNode)} / ${this.singlePercentageString(datum, topNode)}`
  }

  singlePercentageString(datum: TDatum, comparison: TDatum): string {
    const topNode: TDatum = this.state.current.get("computed").renderer.topNode
    const percentage: string = (dataValue(datum) * 100 / dataValue(comparison)).toPrecision(3)
    return `${percentage}% of ${dataName(comparison)}`
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

export default SunburstFocus
