import { css } from "glamor"
import { operational as theme } from "@operational/theme"
import { seriesLegend } from "../utils/styles"

const comparisonLegendStyle = {
  padding: "1px 3px 0 3px",
  float: "left",
  lineHeight: "14px",
  "& div.color": {
    width: "6px",
    height: "6px",
    margin: "2px 3px 0 0",
    float: "left"
  },
  "& div.name": {
    float: "left"
  }
}

const comparisonLegendLineStyle = {
  width: "4px",
  height: "0px",
  border: "1px solid #747474",
  margin: "5px 3px 3px 3px",
  float: "left"
}

const arcStyle = {
  stroke: "#fff",
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
  }
}

export const arc = css(arcStyle).toString()
export const label = css(labelStyle).toString()
export const total = css(totalStyle).toString()
export const comparisonLegend = seriesLegend
export const comparisonLegendLine = css(comparisonLegendLineStyle).toString()
export const breadcrumb = css(breadcrumbStyle).toString()
