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

function getPositionClass(position: string): string {
  switch (position) {
    case "above":
      return styles.focusLegendAbove
    case "below":
      return styles.focusLegendBelow
    case "toRight":
      return styles.focusLegendRight
    case "toLeft":
      return styles.focusLegendLeft
    default:
      return ""
  }
}

function switchSides(el: D3Selection, from: string, to: string): void {
  if (!to) {
    return
  }
  el.classed(getPositionClass(from), false)
  el.classed(getPositionClass(to), true)
}

const xArrowOffsetPosition: any = {
  above: 0,
  below: 0,
  toLeft: -1,
  toRight: 1,
}

const yArrowOffsetPosition: any = {
  above: -1,
  below: 1,
  toLeft: 0,
  toRight: 0,
}

// Focus Label Formatting
const FocusUtils: Object<any> = {
  // Public Functions

  // Initial, hidden rendering of the focus label.
  // Allows the dimensions of the focus label to be calculated, and hence allows label positioning,
  // before the label is made visible.
  drawHidden: (canvasEl: D3Selection, type: string, position?: string): D3Selection => {
    return canvasEl
      .attr("class", `${styles.focusLegend} ${getPositionClass(position)} focus-legend-${type}`)
      .style("visibility", "hidden")
  },

  // Move the focus label to the desired position and make it visible.
  drawVisible: (focusEl: D3Selection, labelPlacement: { top: number; left: number }, position: string): void => {
    const arrowOffset: number = 5
    const xArrowOffset: number = arrowOffset * xArrowOffsetPosition[position]
    const yArrowOffset: number = arrowOffset * yArrowOffsetPosition[position]

    focusEl
      .style("top", labelPlacement.top + yArrowOffset + "px")
      .style("left", labelPlacement.left + xArrowOffset + "px")
      .style("visibility", "visible")
  },

  // Return dimensions of focus label, including width of any margins or borders.
  labelDimensions: (focusEl: D3Selection): { height: number; width: number } => {
    const rect: ClientRect = focusEl.node().getBoundingClientRect()
    return {
      height: rect.height,
      width: rect.width,
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
      right: drawing.xMin + focus.x + offset,
    }

    const y: Object<number> = {
      above: drawing.yMin + focus.y - offset - label.height,
      below: drawing.yMin + focus.y + offset,
      bottom: drawing.yMin + drawing.yMax - offset - label.height,
      top: drawing.yMin + offset,
    }

    let top: number
    let left: number
    let newPosition: string
    switch (position) {
      case "above":
        top = optimalPosition([y.above, y.below, y.top], drawing.yMin, drawing.yMax, label.height)
        left = this.default.horizontalCenter(focus, label, drawing)
        if (top !== y.above) {
          newPosition = "below"
        }
        break
      case "below":
        top = optimalPosition([y.below, y.above, y.bottom], drawing.yMin, drawing.yMax, label.height)
        left = this.default.horizontalCenter(focus, label, drawing)
        if (top !== y.above) {
          newPosition = "above"
        }
        break
      case "toLeft":
        top = this.default.verticalCenter(focus, label, drawing)
        left = optimalPosition([x.left, x.right, x.farRight], drawing.yMin, drawing.yMax, label.height)
        if (left !== x.left) {
          newPosition = "toRight"
        }
        break
      case "toRight":
        top = this.default.verticalCenter(focus, label, drawing)
        left = optimalPosition([x.right, x.left, x.farLeft], drawing.xMin, drawing.xMax, label.width)
        if (left === x.left) {
          newPosition = "toLeft"
        }
        break
      default:
        throw new Error(`Invalid label position '${position}'.`)
    }
    // Finally. Done.
    switchSides(el, position, newPosition || position)
    this.default.drawVisible(el, { left, top }, newPosition || position)
  },

  // Finds the y value that centres the focus label vertically (without overflowing the drawing area).
  verticalCenter: (focus: Object<number>, label: Object<number>, drawing: Object<number>): number => {
    return Math.min(Math.max(focus.y + drawing.yMin - label.height / 2, drawing.yMin), drawing.yMax)
  },

  horizontalCenter: (focus: Object<number>, label: Object<number>, drawing: Object<number>): number => {
    return Math.min(Math.max(focus.x + drawing.xMin - label.width / 2, drawing.xMin), drawing.xMax)
  },
}

export default FocusUtils
