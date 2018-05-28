import { css } from "glamor"
import { operational as theme } from "@operational/theme"

const tickStyle = {
  fill: theme.colors.gray,
  fontFamily: theme.fontFamily,
  "&.weekend": {
    fill: "#9d261d",
  },
  "&.now": {
    fill: "#71a934",
  },
}

const xStyle = {
  textAnchor: "middle",
}

const y1Style = {
  textAnchor: "end",
}

const y2Style = {
  textAnchor: "start",
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

export const tick = css(tickStyle).toString()
export const x1 = css(xStyle).toString()
export const x2 = css(xStyle).toString()
export const y1 = css(y1Style).toString()
export const y2 = css(y2Style).toString()
export const border = css(borderStyle).toString()
export const componentRect = css(componentRectStyle).toString()
export const rules = css(rulesStyle).toString()
