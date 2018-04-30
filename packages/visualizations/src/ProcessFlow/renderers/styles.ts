import { css } from "glamor"

const elementStyle = {
  pointerEvents: "none",
}

const borderStyle = {
  cursor: "pointer",
}

const labelStyle = {
  fillOpacity: 0.7,
}

export const element = css(elementStyle).toString()
export const border = css(borderStyle).toString()
export const label = css(labelStyle).toString()
