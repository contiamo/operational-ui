import { css } from "glamor"
import { operational as theme } from "@operational/theme"

const focusGroupStyle = {
  strokeWidth: "1.5px",
  "& line": {
    stroke: theme.colors.gray,
    shapeRenderering: "crispEdges",
  },
  "& circle": {
    stroke: "#fff",
  },
}

export const focusGroup = css(focusGroupStyle).toString()
