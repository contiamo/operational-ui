import { css } from "glamor"
import { deprecatedTheme } from "../../utils/theme"

const labelStyle = {
  fill: deprecatedTheme.colors.gray,
  fontFamily: deprecatedTheme.fontFamily,
  "&.weekend": {
    fill: "#9d261d",
  },
  "&.now": {
    fill: "#71a934",
  },
}

const borderStyle = {
  stroke: deprecatedTheme.colors.border,
  shapeRendering: "crispedges",
}

const componentRectStyle = {
  opacity: 0,
}

const rulesStyle = {
  stroke: deprecatedTheme.colors.lightGray,
  strokeWidth: "1",
  shapeRendering: "crispedges",
  "&.zero": {
    strokeWidth: "2",
  },
}

const tickStyle = {
  stroke: deprecatedTheme.colors.border,
  strokeWidth: "1",
  shapeRendering: "crispedges",
  "&.zero": {
    strokeWidth: "2",
  },
}

export const label = css(labelStyle).toString()
export const border = css(borderStyle).toString()
export const componentRect = css(componentRectStyle).toString()
export const rules = css(rulesStyle).toString()
export const tick = css(tickStyle).toString()
