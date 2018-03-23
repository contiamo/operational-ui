import { css } from "glamor"
import { operational as theme } from "@operational/theme"

const tickStyle = {
  fill: theme.colors.gray60,
  fontSize: "11px",
  fontFamily: theme.fontFamily,
  "&.weekend": {
    fill: "#9d261d"
  },
  "&.now": {
    fill: "#71a934"
  }
}

const borderStyle = {
  stroke: theme.colors.gray20,
  shapeRendering: "crispedges"
}

const componentRectStyle = {
  fill: "#fff"
}

export const tick = css(tickStyle).toString()
export const border = css(borderStyle).toString()
export const componentRect = css(componentRectStyle).toString()
