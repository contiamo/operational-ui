import { css } from "glamor"
import { operational as theme } from "@operational/theme"

const labelStyle = {
  fill: theme.colors.gray,
  fontFamily: theme.fontFamily,
  "&.weekend": {
    fill: "#9d261d",
  },
  "&.now": {
    fill: "#71a934",
  },
}

const borderStyle = {
  stroke: theme.colors.border,
  shapeRendering: "crispedges",
}

const componentRectStyle = {
  fill: "#fff",
}

const rulesStyle = {
  stroke: theme.colors.lightGray,
  strokeWidth: "1",
  shapeRendering: "crispedges",
  "&.zero": {
    strokeWidth: "2",
  },
}

const tickStyle = {
  stroke: theme.colors.border,
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
