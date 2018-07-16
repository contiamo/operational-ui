import { css } from "glamor"
import theme from "../../utils/constants"

const labelStyle = {
  fill: theme.colors.axis.label,
  fontFamily: theme.font.family,
  "&.weekend": {
    fill: "#9d261d",
  },
  "&.now": {
    fill: "#71a934",
  },
}

const borderStyle = {
  stroke: theme.colors.axis.border,
  shapeRendering: "crispedges",
}

const componentRectStyle = {
  opacity: 0,
}

const rulesStyle = {
  stroke: theme.colors.axis.rules,
  strokeWidth: "1",
  shapeRendering: "crispedges",
  "&.zero": {
    strokeWidth: "2",
  },
}

const tickStyle = {
  stroke: theme.colors.axis.border,
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
