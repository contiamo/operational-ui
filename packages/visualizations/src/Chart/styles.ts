import { css } from "glamor"
import { deprecatedTheme } from "../utils/theme"

const focusGroupStyle = {
  strokeWidth: "1.5px",
  "& line": {
    stroke: deprecatedTheme.colors.gray,
    shapeRenderering: "crispEdges",
  },
  "& circle": {
    stroke: "#fff",
  },
}

export const focusGroup = css(focusGroupStyle).toString()
