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

const componentFocusStyle = {
  position: "absolute",
  pointerEvents: "all",
  backgroundColor: "rgba(190, 255, 255, 0.1)",
  borderRadius: "3px",
  border: "1px solid #dcf1ff",
  padding: 0,
  cursor: "pointer"
}

const chartContainerStyle = {
  position: "relative",
  display: "block",
  backgroundColor: "#fff",
  "&.hidden": {
    display: "none"
  }
}

const focusLegendStyle = {
  userSelect: "none",
  pointerEvents: "none",
  boxSizing: "content-box",
  padding: "4px 8px",
  border: "1px solid #cdcdcd",
  position: "absolute",
  zIndex: 3000,
  maxWidth: "350px",
  backgroundColor: "#fff",
  "& ul": {
    listStyle: "none",
    fontSize: 12,
    margin: 0,
    padding: 0
  },
  "& li.title, span.title": {
    fontWeight: "bold"
  },
  "& span.title": {
    paddingRight: "6px"
  },
  "&::after": {
    content: "''",
    position: "absolute",
    width: 0,
    height: 0
  },
  "&.above::after": {
    borderTop: "solid 7px #fff",
    borderLeft: "solid 7px transparent",
    borderRight: "solid 7px transparent",
    top: "100%",
    left: "50%",
    marginLeft: "-7px"
  }
}

export const chartContainer = css(chartContainerStyle).toString()
export const focusLegend = css(focusLegendStyle).toString()
export const legend = css(legendStyle).toString()
export const legendTopBottom = css(legendTopBottomStyle).toString()
export const seriesLegend = css(seriesLegendStyle).toString()
export const drawingContainer = css(drawingContainerStyle).toString()
export const chartBackground = css(chartBackgroundStyle).toString()
export const rule = css(ruleStyle).toString()
export const componentFocus = css(componentFocusStyle).toString()
