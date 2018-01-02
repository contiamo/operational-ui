import { css } from "glamor"

const legendStyle = {
  fontSize: "11px",
  position: "relative",
  overflow: "hidden"
}

const legendTopBottomStyle = {
  padding: "0 7px",
  margin: "3px 0",
  "& .series-legend, .comparison-legend": {
    float: "left"
  }
}

const seriesLegendStyle = {
  padding: "1px 3px 0 3px",
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

const drawingContainerStyle = {
  position: "relative",
  overflow: "hidden"
}

const chartBackgroundStyle = {
  fill: "#fff"
}

const ruleStyle = {
  stroke: "#eee",
  strokeWidth: "1px",
  shapeRendering: "crispedges",
  "& .zero": {
    strokeWidth: "2px"
  },
  "& .now": {
    stroke: "#71a934",
    strokeDasharray: "2, 4"
  }
}

export const legend = css(legendStyle).toString()
export const legendTopBottom = css(legendTopBottomStyle).toString()
export const seriesLegend = css(seriesLegendStyle).toString()
export const drawingContainer = css(drawingContainerStyle).toString()
export const chartBackground = css(chartBackgroundStyle).toString()
export const rule = css(ruleStyle).toString()
