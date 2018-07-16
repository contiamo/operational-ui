import { css } from "glamor"

import { setBrightness } from "../utils/color"
import theme from "../utils/constants"

const breakdownStyle = {
  maxWidth: "300px",
  padding: "6px",
  background: "white",
}

const breakdownsContainerStyle = {
  width: "300px",
  float: "left",
  padding: "7px 0",
}

const breakdownContainerStyle = {
  padding: `2%`,
  background: theme.colors.white,
  width: "46%",
  float: "left",
}

const breakdownLabelStyle = {
  ...theme.font.small,
  display: "block",
  marginBottom: theme.space.small,
}

const breakdownCommentLabelStyle = {
  marginLeft: "6px",
}

const breakdownBackgroundBarStyle = {
  position: "relative",
  width: "100%",
  fontSize: 12,
  overflow: "hidden",
  backgroundColor: theme.colors.lightGrey,
}

const breakdownBarStyle = {
  content: "",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 0,
  display: "block",
  height: "100%",
  pointerEvents: "none",
  backgroundColor: setBrightness(theme.colors.primary, 145),
}

const breakdownTextStyle = {
  ...theme.font.small,
  lineHeight: 1,
  color: theme.font.color,
  position: "relative",
  top: 1,
  fontWeight: 400,
  padding: `${theme.space.small}px ${theme.space.default}px`,
}

const titleStyle = {
  fontWeight: "bold",
  color: "#555",
  "& span": {
    fontWeight: "normal",
  },
}

const contentStyle = {
  paddingTop: "15px",
}

export const breakdown = css(breakdownStyle).toString()
export const breakdownsContainer = css(breakdownsContainerStyle).toString()
export const breakdownContainer = css(breakdownContainerStyle).toString()
export const breakdownLabel = css(breakdownLabelStyle).toString()
export const breakdownCommentLabel = css(breakdownCommentLabelStyle).toString()
export const breakdownBackgroundBar = css(breakdownBackgroundBarStyle).toString()
export const breakdownBar = css(breakdownBarStyle).toString()
export const breakdownText = css(breakdownTextStyle).toString()
export const title = css(titleStyle).toString()
export const content = css(contentStyle).toString()
