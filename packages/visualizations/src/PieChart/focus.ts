import FocusUtils from "../utils/focus_utils"
import AbstractDrawingFocus from "../utils/focus"
import * as d3 from "d3-selection"

const dataName = (d: any): string => d.data.key
const dataValue = (d: any): number => d.data.value
const dataPercentage = (d: any): string => d.data.percentage.toFixed(1) + "%"

class Focus extends AbstractDrawingFocus {
  onElementHover(payload: { focusPoint: any; d: any }): void {
    this.remove()

    const focusPoint: any = payload.focusPoint,
      datum: any = payload.d

    FocusUtils.drawHidden(this.el, "element")

    let content: any = this.el.append("xhtml:ul")

    content
      .append("xhtml:li")
      .attr("class", "title")
      .text(dataName(datum))

    content
      .append("xhtml:li")
      .attr("class", "series")
      .html(
        '<span class="value">' +
          dataValue(datum) +
          '</span> \
        <span class="percentage">(' +
          dataPercentage(datum) +
          ")</span>"
      )

    // Get label dimensions
    const labelDimensions: { height: number; width: number } = FocusUtils.labelDimensions(this.el)
    const labelPlacement: { left: number; top: number } = {
      left: focusPoint.centroid[0] - labelDimensions.width / 2,
      top: focusPoint.centroid[1]
    }

    FocusUtils.drawVisible(this.el, labelPlacement)
  }
}

export default Focus
