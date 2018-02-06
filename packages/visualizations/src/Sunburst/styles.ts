import { css } from "glamor"
import { operational as theme } from "@operational/theme"
import { seriesLegend } from "../utils/styles"

const arcStyle = {
  strokeWidth: "1",
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
  padding: "10px 5px",
  "& svg": {
    width: "100%",
    height: "21px"
  },
  "& polygon": {
    opacity: "0.5",
    cursor: "pointer"
  },
  "& text": {
    pointerEvents: "none"
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

export const arc = css(arcStyle).toString()
export const label = css(labelStyle).toString()
export const total = css(totalStyle).toString()
export const breadcrumb = css(breadcrumbStyle).toString()
export const centerCircle = css(centerCircleStyle).toString()
export const rootLabel = css(rootLabelStyle).toString()
