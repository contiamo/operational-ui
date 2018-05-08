import { css } from "glamor"
import { operational as theme } from "@operational/theme"

const areaStyle = {
  "& path": {
    opacity: "0.6"
  },
  "& path:hover": {
    opacity: "0.8"
  }
}

const barStyle = {
  "& rect": {
    opacity: 0.8,
    shapeRendering: "crispedges"
  },
  "& rect:hover": {
    opacity: 1
  }
}

const lineStyle = {
  "& path": {
    strokeWidth: 2,
    fill: "none"
  },
  "& path:hover": {
    strokeWidth: 4
  },
  "& path.dashed": {
    strokeDasharray: "6, 4"
  }
}

const symbolStyle = {
  "& path": {
    strokeWidth: "2px"
  },
  "& path:hover": {
    strokeWidth: "3px"
  }
}

const textStyle = {
  "& text": {
    fill: "#333",
    fontFamily: theme.fontFamily
  }
}

export const area = css(areaStyle).toString()
export const bar = css(barStyle).toString()
export const line = css(lineStyle).toString()
export const symbol = css(symbolStyle).toString()
export const text = css(textStyle).toString()
