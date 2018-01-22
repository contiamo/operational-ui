import { css } from "glamor"
import { operational as theme } from "@operational/theme"
import { seriesLegend } from "../utils/styles"

const arcStyle = {
  strokeWidth: "1",
  opacity: 0.8,
  fill: "#eee",
  "&.parent": {
    fill: "#fff"
  }
}

const labelStyle = {
  fill: "#333",
  stroke: "none",
  ...theme.typography.small
}

const totalStyle = {
  fill: "#4c4c4c",
  ...theme.typography.small
}

const breadcrumbStyle = {
  width: "100%",
  height: "30px",
  paddingTop: "10px",
  marginBottom: "10px",
  "& svg": {
    width: "100%",
    height: "100%"
  },
  "& polygon": {
    opacity: "0.5",
    cursor: "pointer"
  },
  "& text": {
    pointerEvents: "none"
  }
}

export const arc = css(arcStyle).toString()
export const label = css(labelStyle).toString()
export const total = css(totalStyle).toString()
export const breadcrumb = css(breadcrumbStyle).toString()
