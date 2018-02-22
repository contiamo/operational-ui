import { css } from "glamor"
import { operational as theme } from "@operational/theme"
import { seriesLegend } from "../utils/styles"

const arcStyle = {
  strokeWidth: "1",
  stroke: "#fff",
  opacity: 0.8,
  fill: "#eee",
  "&.zoomable": {
    cursor: "zoom-in"
  },
  "&.zoomed": {
    cursor: "zoom-out"
  },
  "&.zoomed.parent": {
    cursor: "default"
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
  height: "40px",
  position: "relative",
  overflow: "hidden"
}

const breadcrumbItemStyle = {
  float: "left",
  width: "80px",
  height: "26px",
  position: "relative",
  paddingLeft: "20px",
  lineHeight: "26px",
  cursor: "pointer",
  margin: "5px 0",
  "&:first-child": {
    paddingLeft: "5px"
  },
  "&.hops": {
    width: "40px"
  },
  "& .label": {
    pointerEvents: "none",
    float: "left",
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "65px"
  },
  "& .background-arrow": {
    content: "''",
    position: "absolute",
    width: 0,
    height: 0,
    borderLeft: "solid 16px #fff",
    borderTop: "solid 16px transparent",
    borderBottom: "solid 16px transparent",
    top: "50%",
    left: "100%",
    marginTop: "-16px",
    zIndex: "2"
  },
  "& .arrow": {
    content: "''",
    position: "absolute",
    width: 0,
    height: 0,
    borderLeft: "solid 13px #fff",
    borderTop: "solid 13px transparent",
    borderBottom: "solid 13px transparent",
    top: "50%",
    left: "100%",
    marginTop: "-13px",
    zIndex: "3"
  }
}

const centerCircleStyle = {
  fill: "#fff",
  pointerEvents: "none"
}

const rootLabelStyle = {
  position: "absolute",
  textAlign: "center",
  pointerEvents: "none",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "& .name": {
    ...theme.typography.small
  },
  "& .value": {
    ...theme.typography.heading1
  }
}

const arrowStyle = {
  fill: "transparent",
  stroke: "#bbb",
  strokeWidth: "1px",
  cursor: "zoom-in",
  "&:hover": {
    stroke: "#aaa"
  }
}

export const arc = css(arcStyle).toString()
export const label = css(labelStyle).toString()
export const total = css(totalStyle).toString()
export const breadcrumb = css(breadcrumbStyle).toString()
export const breadcrumbItem = css(breadcrumbItemStyle).toString()
export const centerCircle = css(centerCircleStyle).toString()
export const rootLabel = css(rootLabelStyle).toString()
export const arrow = css(arrowStyle).toString()
