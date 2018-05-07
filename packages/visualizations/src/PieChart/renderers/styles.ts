import { css } from "glamor"
import { operational as theme } from "@operational/theme"

const arcStyle = {
  stroke: "#fff",
  strokeWidth: "1",
  fill: "#eee",
}

const labelStyle = {
  fill: "#333",
  stroke: "none",
  pointerEvents: "none",
  ...theme.typography.small,
}

const labelBackgroundStyle = {
  fill: "rgba(255, 255, 255, 0.2)",
  pointerEvents: "none",
  stroke: "none",
  borderRadius: theme.borderRadius,
}

const totalStyle = {
  fill: "#4c4c4c",
  ...theme.typography.small,
}

const comparisonStyle = {
  stroke: "#747474",
  strokeWidth: 2,
  strokeDasharray: "6 4",
}

export const arc = css(arcStyle).toString()
export const label = css(labelStyle).toString()
export const labelBackground = css(labelBackgroundStyle).toString()
export const total = css(totalStyle).toString()
export const comparison = css(comparisonStyle).toString()
