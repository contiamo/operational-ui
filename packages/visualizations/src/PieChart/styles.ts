import { css } from "glamor"
import { seriesLegend } from "../shared/styles"

const comparisonLegendStyle = {
  padding: "1px 3px 0 3px",
  float: "left",
  lineHeight: "14px",
  "& div.color": {
    width: "10px",
    height: "10px",
    margin: "2px 3px 0 0",
    float: "left",
  },
  "& div.name": {
    float: "left",
  },
}

const comparisonLegendLineStyle = {
  width: "4px",
  height: "0px",
  border: "1px solid #747474",
  margin: "5px 3px 3px 3px",
  float: "left",
}

export const comparisonLegend = seriesLegend
export const comparisonLegendLine = css(comparisonLegendLineStyle).toString()
