import FocusUtils from "../utils/focus_utils"
import AbstractDrawingFocus from "../utils/focus"
import * as d3 from "d3-selection"
import { TD3Selection, TDatum, IObject } from "./typings"

const percentageString = (percentage: number): string => percentage.toFixed(1) + "%"

class Focus extends AbstractDrawingFocus {
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
        '<span class="value">' +
          payload.d.value +
          '</span> \
        <span class="percentage">(' +
          percentageString(payload.d.percentage) +
          ")</span>"
      )

    // Get label dimensions
    const labelDimensions: { height: number; width: number } = FocusUtils.labelDimensions(this.el),
      labelPlacement: { left: number; top: number } = {
        left: payload.focusPoint.centroid[0] - labelDimensions.width / 2,
        top: payload.focusPoint.centroid[1]
      }

    FocusUtils.drawVisible(this.el, labelPlacement)
  }
}

export default Focus
