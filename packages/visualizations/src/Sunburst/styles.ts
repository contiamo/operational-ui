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
  padding: "10px 5px 0 5px",
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

const explanationStyle = {
  padding: "10px 0",
  visibility: "hidden",
  "& span.percentage": {
    fontWeight: "bold"
  }
}

const centerCircleStyle = {
  fill: "#fff",
  pointerEvents: "none"
}

const centerContentStyle = {
  position: "absolute",
  textAlign: "center",
  pointerEvents: "none",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "& .name": {
    ...theme.typography.heading1
  },
  "& .value": {
    ...theme.typography.small
  }
}

export const arc = css(arcStyle).toString()
export const label = css(labelStyle).toString()
export const total = css(totalStyle).toString()
export const breadcrumb = css(breadcrumbStyle).toString()
export const explanation = css(explanationStyle).toString()
export const centerCircle = css(centerCircleStyle).toString()
export const centerContent = css(centerContentStyle).toString()
