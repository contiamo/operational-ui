import { css } from "glamor"
import theme from "../utils/constants"

const focusGroupStyle = {
  strokeWidth: "1.5px",
  "& line": {
    stroke: theme.colors.focus.stroke,
    shapeRenderering: "crispEdges",
  },
  "& circle": {
    stroke: theme.colors.white,
  },
}

export const focusGroup = css(focusGroupStyle).toString()
