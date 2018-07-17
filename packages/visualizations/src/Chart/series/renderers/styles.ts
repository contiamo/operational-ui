import { css } from "glamor"
import theme from "../../../utils/constants"

const areaStyle = {
  "& path:hover": {
    opacity: "0.8",
  },
}

const barStyle = {
  "& rect": {
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
    opacity: 1,
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
    opacity: 1,
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
    opacity: 1,
  },
}

const textStyle = {
  "& text": {
    fill: "#333",
    fontFamily: theme.font.family,
    dominantBaseline: "middle",
  },
  "& text:hover": {
    opacity: 1,
  },
}

export const area = css(areaStyle).toString()
export const bar = css(barStyle).toString()
export const flag = css(flagStyle).toString()
export const line = css(lineStyle).toString()
export const symbol = css(symbolStyle).toString()
export const text = css(textStyle).toString()
