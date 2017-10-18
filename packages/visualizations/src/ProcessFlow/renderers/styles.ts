import { css } from "glamor"

const nodeStyle = {
  pointerEvents: "none"
}

const linkStyle = {
  cursor: "pointer"
}

const labelStyle = {
  fillOpacity: 0.7
}

export const node = css(nodeStyle).toString()
export const link = css(linkStyle).toString()
export const label = css(labelStyle).toString()