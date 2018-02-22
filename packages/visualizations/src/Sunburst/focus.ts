import FocusUtils from "../utils/focus_utils"
import AbstractFocus from "../utils/focus"
import * as d3 from "d3-selection"
import { IEvents, IObject, IState, TD3Selection, TDatum, TStateWriter } from "./typings"

const dataName = (d: TDatum): string => d.data.name,
  dataValue = (d: TDatum): number => d.value

class Focus extends AbstractFocus {
  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, els: IObject) {
    super(state, stateWriter, events, els)
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
}

export default Focus
