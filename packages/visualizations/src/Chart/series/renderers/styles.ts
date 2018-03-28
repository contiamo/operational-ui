import { css } from "glamor"
import { operational as theme } from "@operational/theme"

const areaStyle = {
  opacity: "0.6"
}

const lineStyle = {
  "& path": {
    strokeWidth: 2,
    fill: "none"
  },
  "& path.hover": {
    strokeWidth: 4
  },
  "& path.dashed": {
    strokeDasharray: "6, 4"
  }
}

export const area = css(areaStyle).toString()
export const line = css(lineStyle).toString()
