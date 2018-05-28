import { css } from "glamor"
import { operational as theme } from "@operational/theme"

const areaStyle = {
  "& path": {
    opacity: "0.6",
  },
  "& path:hover": {
    opacity: "0.8",
  },
}

const barStyle = {
  "& rect": {
    opacity: 0.8,
    shapeRendering: "crispedges",
  },
  "& rect:hover": {
    opacity: 1,
  },
}

const flagStyle = {
  "& line": {
    strokeDasharray: "5px 2px",
  },
  "& .hover": {
    strokeWidth: "2px",
  },
  "& text": {
    fontSize: "11px",
    dominantBaseline: "central",
  },
  "& path.hover-flag": {
    cursor: "pointer",
    shapeRendering: "crispedges",
  },
}

const lineStyle = {
  "& path": {
    strokeWidth: 2,
    fill: "none",
  },
  "& path:hover": {
    strokeWidth: 4,
  },
  "& path.dashed": {
    strokeDasharray: "6, 4",
  },
}

const symbolStyle = {
  "& path": {
    strokeWidth: "2px",
  },
  "& path:hover": {
    strokeWidth: "3px",
  },
}

const textStyle = {
  "& text": {
    fill: "#333",
    fontFamily: theme.fontFamily,
    dominantBaseline: "middle",
  },
}

export const area = css(areaStyle).toString()
export const bar = css(barStyle).toString()
export const flag = css(flagStyle).toString()
export const line = css(lineStyle).toString()
export const symbol = css(symbolStyle).toString()
export const text = css(textStyle).toString()
