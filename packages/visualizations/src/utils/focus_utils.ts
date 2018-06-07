// Util methods to help position and format focus labels
import { find, last } from "lodash/fp"
import * as d3 from "d3-selection"
import * as styles from "../shared/styles"
import { D3Selection, Dimensions, Point, Position } from "../shared/typings"

// Private constants
const positionClass: { [key: string]: string } = {
  above: styles.focusLegendAbove,
  below: styles.focusLegendBelow,
  toRight: styles.focusLegendRight,
  toLeft: styles.focusLegendLeft,
}

const ARROW_OFFSET: number = 8

const xArrowOffset: { [key: string]: number } = {
  above: 0,
  below: 0,
  toLeft: -ARROW_OFFSET,
  toRight: ARROW_OFFSET,
}

const yArrowOffset: { [key: string]: number } = {
  above: -ARROW_OFFSET,
  below: ARROW_OFFSET,
  toLeft: 0,
  toRight: 0,
}

// Helper functions

// Chooses the first of a given list of possible x or y coordinates (`possibilities`) for which a focus label
// of width or height `dimension` does not go out of the available space ([min, max])
const optimalPosition = (possibilities: number[], min: number, max: number, dimension: number): number => {
  const withinRange = (value: number): boolean => value >= min && value + dimension <= max
  return find(withinRange)(possibilities) || last(possibilities)
}

// Calculates the optimal label position
export const calculateLabelPosition = (
  focus: Point,
  label: Dimensions,
  drawing: { [key: string]: number },
  offset: number,
  position: string,
  displayArrow: boolean,
) => {
  // Options for x coordinates
  const x: { [key: string]: number } = {
    farLeft: drawing.xMin + offset,
    farRight: drawing.xMax - offset - label.width,
    left: drawing.xMin + focus.x - offset - label.width,
    right: drawing.xMin + focus.x + offset,
  }

  // Options for y coordinates
  const y: { [key: string]: number } = {
    above: drawing.yMin + focus.y - offset - label.height,
    below: drawing.yMin + focus.y + offset,
    bottom: drawing.yMax - offset - label.height,
    top: drawing.yMin + offset,
  }

  let top: number
  let left: number
  let newPosition: string
  switch (position) {
    case "above":
      top = optimalPosition([y.above, y.below, y.top], drawing.yMin, drawing.yMax, label.height)
      left = horizontalCenter(focus, label, drawing)
      newPosition = top === y.below ? "below" : "above"
      break
    case "below":
      top = optimalPosition([y.below, y.above, y.bottom], drawing.yMin, drawing.yMax, label.height)
      left = horizontalCenter(focus, label, drawing)
      newPosition = top === y.above ? "above" : "below"
      break
    case "toLeft":
      top = verticalCenter(focus, label, drawing)
      left = optimalPosition([x.left, x.right, x.farRight], drawing.xMin, drawing.xMax, label.width)
      newPosition = left === x.left ? "toLeft" : "toRight"
      break
    case "toRight":
      top = verticalCenter(focus, label, drawing)
      left = optimalPosition([x.right, x.left, x.farLeft], drawing.xMin, drawing.xMax, label.width)
      newPosition = left === x.right ? "toRight" : "toLeft"
      break
    default:
      throw new Error(`Invalid label position '${position}'.`)
  }

  left = left + xArrowOffset[newPosition]
  top = top + yArrowOffset[newPosition]

  return { left, top, position: newPosition }
}

// Draws an arrow on the correct edge of a focus label pointing to focus point.
const drawArrow = (el: D3Selection, coordinates: Point, position: string): void => {
  el.append("div")
    .attr("class", positionClass[position])
    .style("left", `${coordinates.x}px`)
    .style("top", `${coordinates.y}px`)
    .append("div")
    .attr("class", "arrowFill")
}

// Find the y value that centres the focus label vertically where possible, without overflowing the drawing area.
export const verticalCenter = (focus: Point, label: Dimensions, drawing: { [key: string]: number }): number => {
  return Math.min(Math.max(focus.y + drawing.yMin - label.height / 2, drawing.yMin), drawing.yMax)
}

// Find the x value that centres the focus label horizontally where possible, without overflowing the drawing area.
export const horizontalCenter = (focus: Point, label: Dimensions, drawing: { [key: string]: number }): number => {
  return Math.min(Math.max(focus.x + drawing.xMin - label.width / 2, drawing.xMin), drawing.xMax)
}

// Public Functions

// Initial, hidden rendering of the focus label.
// Allows the dimensions of the focus label to be calculated, and hence allows label positioning,
// before the label is made visible.
export const drawHidden = (canvasEl: D3Selection, type: string): D3Selection => {
  return canvasEl.attr("class", `${styles.focusLegend} focus-legend-${type}`).style("visibility", "hidden")
}

// Returns the dimensions of a focus label, including any margins or borders.
export const labelDimensions = (focusEl: D3Selection): Dimensions => {
  const rect: ClientRect = focusEl.node().getBoundingClientRect()
  return {
    height: rect.height,
    width: rect.width,
  }
}

// Automatically positions a focus label according to the desired position relative to focus point.
// Uses label and drawing dimensions to ensure focus label does not overflow drawing.
export const positionLabel = (
  el: D3Selection,
  focus: Point,
  label: Dimensions,
  drawing: { [key: string]: number },
  offset: number = 0,
  position: string = "toRight",
  displayArrow: boolean = true,
): void => {
  const labelPosition = calculateLabelPosition(focus, label, drawing, offset, position, displayArrow)

  let arrowX: number
  let arrowY: number
  switch (labelPosition.position) {
    case "above":
      arrowX = focus.x + drawing.xMin - labelPosition.left
      arrowY = label.height
      break
    case "below":
      arrowX = focus.x + drawing.xMin - labelPosition.left
      arrowY = 0
      break
    case "toLeft":
      arrowY = focus.y + drawing.yMin - labelPosition.top
      arrowX = label.width
      break
    case "toRight":
      arrowY = focus.y + drawing.yMin - labelPosition.top
      arrowX = 0
      break
    default:
      throw new Error(`Invalid label position '${labelPosition.position}'.`)
  }

  drawVisible(el, labelPosition)
  if (displayArrow) {
    drawArrow(el, { x: arrowX, y: arrowY }, labelPosition.position)
  }
}

// Moves the focus label to the desired position and make it visible.
export const drawVisible = (focusEl: D3Selection, labelPlacement: Position): void => {
  focusEl
    .style("top", `${labelPlacement.top}px`)
    .style("left", `${labelPlacement.left}px`)
    .style("visibility", "visible")
}
