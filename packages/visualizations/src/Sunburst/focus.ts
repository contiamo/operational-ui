import FocusUtils from "../utils/focus_utils"
import AbstractFocus from "../utils/focus"
import * as d3 from "d3-selection"
import { TD3Selection, TDatum, IObject } from "./typings"

const dataName = (d: TDatum): string => d.data.key,
  dataValue = (d: TDatum): number => d.data.value,
  dataPercentage = (d: TDatum): string => d.data.percentage.toFixed(1) + "%"

class Focus extends AbstractFocus {
  onElementHover(payload: { focusPoint: IObject; d: TDatum }): void {
    this.remove()

    const focusPoint: IObject = payload.focusPoint,
      datum: TDatum = payload.d

    FocusUtils.drawHidden(this.el, "element")

    const content: TD3Selection = this.el.append("xhtml:ul")

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
    const labelDimensions: { height: number; width: number } = FocusUtils.labelDimensions(this.el),
      labelPlacement: { left: number; top: number } = {
        left: focusPoint.centroid[0] - labelDimensions.width / 2,
        top: focusPoint.centroid[1]
      }

    FocusUtils.drawVisible(this.el, labelPlacement)
  }
}

export default Focus
