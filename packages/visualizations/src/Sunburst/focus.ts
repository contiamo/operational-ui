import FocusUtils from "../utils/focus_utils"
import AbstractFocus from "../utils/focus"
import * as d3 from "d3-selection"
import { TD3Selection, TDatum, IObject } from "./typings"

const dataName = (d: TDatum): string => d.data.name,
  dataValue = (d: TDatum): number => d.value

class Focus extends AbstractFocus {
  onElementHover(payload: { focusPoint: IObject; d: TDatum }): void {
    this.remove()

    const focusPoint: IObject = payload.focusPoint,
      datum: TDatum = payload.d

    FocusUtils.drawHidden(this.el, "element")

    const content: TD3Selection = this.el.append("xhtml:ul")

    content
      .append("span")
      .attr("class", "title")
      .text(dataName(datum))

    content.append("span").text(`(${dataValue(datum)})`)

    const zoomNode: TDatum = this.state.current.get("computed").renderer.zoomNode
    const percentage: string = (dataValue(datum) * 100 / dataValue(zoomNode)).toPrecision(3)
    content.append("xhtml:li").text(`${percentage}% of ${dataName(zoomNode)}`)

    // Get label dimensions
    const labelDimensions: { height: number; width: number } = FocusUtils.labelDimensions(this.el),
      labelPlacement: { left: number; top: number } = {
        left: focusPoint.centroid[0] - labelDimensions.width / 2,
        top: focusPoint.centroid[1]
      }

    FocusUtils.drawVisible(this.el, labelPlacement)
  }
}

export default Focus
