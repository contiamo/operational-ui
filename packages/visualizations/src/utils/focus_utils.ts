import { find, last } from "lodash/fp"
import * as d3 from "d3-selection"
import * as styles from "./styles"
import { IObject, TD3Selection } from "./typings"

function optimalPosition(possibilities: number[], min: number, max: number, dimension: number): number {
  function withinRange(value: number): boolean {
    return value >= min && value + dimension <= max
  }
  const optimal: number = find(withinRange)(possibilities)
  return optimal || last(possibilities)
}

// Focus Label Formatting
const FocusUtils: IObject = {
  // Public Functions

  // Initial, hidden rendering of the focus label.
  // Allows the dimensions of the focus label to be calculated, and hence allows label positioning,
  // before the label is made visible.
  drawHidden: (canvasEl: TD3Selection, type: string): void => {
    canvasEl.attr("class", styles.focusLegend + " focus-legend-" + type).style("visibility", "hidden")
  },

  // Move the focus label to the desired position and make it visible.
  drawVisible: (focusEl: TD3Selection, labelPlacement: { top: number; left: number }): void => {
    focusEl
      .style("top", labelPlacement.top + "px")
      .style("left", labelPlacement.left + "px")
      .style("visibility", "visible")
  },

  // Return dimensions of focus label, including width of any margins or borders.
  labelDimensions: (focusEl: TD3Selection): { height: number; width: number } => {
    const rect: ClientRect = focusEl.node().getBoundingClientRect()
    return {
      height: rect.height,
      width: rect.width
    }
  },

  // Position focus label according to desired position relative to focus point.
  // Use label and drawing dimensions to ensure focus label does not overflow drawing.
  positionLabel: (
    el: TD3Selection,
    focus: IObject,
    label: IObject,
    drawing: IObject,
    offset: number = 0,
    position: string = "toRight"
  ): void => {
    const x: IObject = {
      farLeft: drawing.xMin + offset,
      farRight: drawing.xMax - offset - label.width,
      left: drawing.xMin + focus.x - offset - label.width,
      right: drawing.xMin + focus.x + offset
    }

    const y: IObject = {
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
        throw new Error("Invalid label position '" + position + "'.")
    }
    // Finally. Done.
    this.default.drawVisible(el, { left, top })
  },

  // Finds the y value that centres the focus label vertically (without overflowing the drawing area).
  verticalCentre: (focus: IObject, label: IObject, drawing: IObject): number => {
    return Math.min(Math.max(focus.y + drawing.yMin - label.height / 2, drawing.yMin), drawing.yMax)
  }
}

export default FocusUtils
