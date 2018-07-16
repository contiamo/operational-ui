import { css } from "glamor"
import theme from "../utils/constants"

const legendStyle = {
  fontSize: "11px",
  position: "relative",
  overflow: "hidden",
}

const legendTopBottomStyle = {
  padding: "3px 7px",
  "& .series-legend, .comparison-legend": {
    float: "left",
  },
}

const seriesLegendStyle = {
  padding: "1px 4px 0 4px",
  marginRight: "2px",
  float: "left",
  lineHeight: "14px",
  "& div.color": {
    width: "10px",
    height: "10px",
    margin: "3px 3px 0 0",
    float: "left",
    borderRadius: "2px",
  },
  "& div.name": {
    float: "left",
    ...theme.font.small,
  },
}

const drawingContainerStyle = {
  position: "relative",
  overflow: "hidden",
}

const ruleStyle = {
  stroke: "#eee",
  strokeWidth: "1px",
  shapeRendering: "crispedges",
  "& .zero": {
    strokeWidth: "2px",
  },
  "& .now": {
    stroke: "#71a934",
    strokeDasharray: "2, 4",
  },
}

const componentFocusStyle = {
  position: "absolute",
  pointerEvents: "all",
  backgroundColor: "rgba(0, 74, 117, 0.05)",
  borderRadius: theme.borderRadius,
  border: 0,
  padding: 0,
  cursor: "pointer",
  maxWidth: "initial",
}

const chartContainerStyle = {
  position: "relative",
  display: "block",
  backgroundColor: "#fff",
  "&.hidden": {
    display: "none",
  },
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
  borderRadius: theme.borderRadius,
  "& ul": {
    listStyle: "none",
    fontSize: 12,
    margin: 0,
    padding: 0,
  },
  "& li.title, span.title": {
    fontWeight: "bold",
  },
  "& span.title": {
    paddingRight: "6px",
  },
  "&::before,::after": {
    content: "''",
    position: "absolute",
    width: 0,
    height: 0,
  },
}

const focusLegendAboveStyle = {
  position: "absolute",
  borderLeft: "solid 8px transparent",
  borderRight: "solid 8px transparent",
  borderTop: "solid 8px #cdcdcd",
  marginLeft: "-8px",
  marginTop: "-2px",
  "& div.arrowFill": {
    position: "absolute",
    borderLeft: "solid 7px transparent",
    borderRight: "solid 7px transparent",
    borderTop: "solid 7px #fff",
    marginLeft: "-7px",
    marginTop: "-9px",
  },
}

const focusLegendBelowStyle = {
  position: "absolute",
  borderLeft: "solid 8px transparent",
  borderRight: "solid 8px transparent",
  borderBottom: "solid 8px #cdcdcd",
  marginLeft: "-8px",
  marginTop: "-8px",
  "& div.arrowFill": {
    position: "absolute",
    borderLeft: "solid 7px transparent",
    borderRight: "solid 7px transparent",
    borderBottom: "solid 7px #fff",
    marginLeft: "-7px",
    marginTop: "1px",
  },
}

const focusLegendRightStyle = {
  position: "absolute",
  borderTop: "solid 8px transparent",
  borderBottom: "solid 8px transparent",
  borderRight: "solid 8px #cdcdcd",
  marginTop: "-8px",
  marginLeft: "-8px",
  "& div.arrowFill": {
    position: "absolute",
    borderTop: "solid 7px transparent",
    borderBottom: "solid 7px transparent",
    borderRight: "solid 7px #fff",
    marginTop: "-7px",
    marginLeft: "1px",
  },
}

const focusLegendLeftStyle = {
  position: "absolute",
  borderTop: "solid 8px transparent",
  borderBottom: "solid 8px transparent",
  borderLeft: "solid 8px #cdcdcd",
  marginTop: "-8px",
  marginLeft: "-2px",
  "& div.arrowFill": {
    position: "absolute",
    borderTop: "solid 7px transparent",
    borderBottom: "solid 7px transparent",
    borderLeft: "solid 7px #fff",
    marginTop: "-7px",
    marginLeft: "-9px",
  },
}

export const chartContainer = css(chartContainerStyle).toString()
export const focusLegend = css(focusLegendStyle).toString()
export const focusLegendAbove = css(focusLegendAboveStyle).toString()
export const focusLegendBelow = css(focusLegendBelowStyle).toString()
export const focusLegendRight = css(focusLegendRightStyle).toString()
export const focusLegendLeft = css(focusLegendLeftStyle).toString()
export const legend = css(legendStyle).toString()
export const legendTopBottom = css(legendTopBottomStyle).toString()
export const seriesLegend = css(seriesLegendStyle).toString()
export const drawingContainer = css(drawingContainerStyle).toString()
export const rule = css(ruleStyle).toString()
export const componentFocus = css(componentFocusStyle).toString()
