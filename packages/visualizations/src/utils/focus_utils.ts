import { find, last } from "lodash/fp"
import * as d3 from "d3-selection"
import * as styles from "./styles"
import { D3Selection, Object } from "./typings"

function optimalPosition(possibilities: number[], min: number, max: number, dimension: number): number {
  function withinRange(value: number): boolean {
    return value >= min && value + dimension <= max
  }
  const optimal: number = find(withinRange)(possibilities)
  return optimal || last(possibilities)
}

// Focus Label Formatting
const FocusUtils: Object<any> = {
  // Public Functions

  // Initial, hidden rendering of the focus label.
  // Allows the dimensions of the focus label to be calculated, and hence allows label positioning,
  // before the label is made visible.
  drawHidden: (canvasEl: D3Selection, type: string, position?: string): D3Selection => {
    return canvasEl
      .attr("class", `${styles.focusLegend} focus-legend-${type} ${position || ""}`)
      .style("visibility", "hidden")
  },

  // Move the focus label to the desired position and make it visible.
  drawVisible: (focusEl: D3Selection, labelPlacement: { top: number; left: number }): void => {
    focusEl
      .style("top", labelPlacement.top + "px")
      .style("left", labelPlacement.left + "px")
      .style("visibility", "visible")
  },

  // Return dimensions of focus label, including width of any margins or borders.
  labelDimensions: (focusEl: D3Selection): { height: number; width: number } => {
    const rect: ClientRect = focusEl.node().getBoundingClientRect()
    return {
      height: rect.height,
      width: rect.width
    }
  },

  // Position focus label according to desired position relative to focus point.
  // Use label and drawing dimensions to ensure focus label does not overflow drawing.
  positionLabel: (
    el: D3Selection,
    // @TODO
    focus: Object<any>,
    label: Object<any>,
    drawing: Object<any>,
    offset: number = 0,
    position: string = "toRight"
  ): void => {
    const x: Object<number> = {
      farLeft: drawing.xMin + offset,
      farRight: drawing.xMax - offset - label.width,
      left: drawing.xMin + focus.x - offset - label.width,
      right: drawing.xMin + focus.x + offset
    }

    const y: Object<number> = {
      above: drawing.yMin + focus.y - offset - label.height,
      below: drawing.yMin + focus.y + offset,
      bottom: drawing.yMin + drawing.yMax - offset - label.height,
      top: drawing.yMin + offset
    }

    let top: number
    let left: number
    switch (position) {
      case "above":
        top = optimalPosition([y.above, y.below, y.top], drawing.yMin, drawing.yMax, label.height)
        left = optimalPosition([x.right, x.left, x.farLeft], drawing.xMin, drawing.xMax, label.width)
        break
      case "below":
        top = optimalPosition([y.below, y.above, y.bottom], drawing.yMin, drawing.yMax, label.height)
        left = optimalPosition([x.right, x.left, x.farLeft], drawing.xMin, drawing.xMax, label.width)
        break
      case "toLeft":
        top = this.default.verticalCentre(focus, label, drawing)
        left = optimalPosition([x.left, x.right, x.farRight], drawing.yMin, drawing.yMax, label.height)
        break
      case "toRight":
        top = this.default.verticalCentre(focus, label, drawing)
        left = optimalPosition([x.right, x.left, x.farLeft], drawing.xMin, drawing.xMax, label.width)
        break
      default:
        throw new Error(`Invalid label position '${position}'.`)
    }
    // Finally. Done.
    this.default.drawVisible(el, { left, top })
  },

  // Finds the y value that centres the focus label vertically (without overflowing the drawing area).
  verticalCentre: (focus: Object<number>, label: Object<number>, drawing: Object<number>): number => {
    return Math.min(Math.max(focus.y + drawing.yMin - label.height / 2, drawing.yMin), drawing.yMax)
  }
}

export default FocusUtils
