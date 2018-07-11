import { css } from "glamor"

import { setBrightness } from "../utils/color"
import { deprecatedTheme } from "../utils/theme"

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
  background: deprecatedTheme.colors.white,
  width: "46%",
  float: "left",
}

const breakdownLabelStyle = {
  ...deprecatedTheme.typography.small,
  display: "block",
  marginBottom: deprecatedTheme.spacing / 4,
}

const breakdownCommentLabelStyle = {
  marginLeft: "6px",
}

const breakdownBackgroundBarStyle = {
  position: "relative",
  width: "100%",
  fontSize: 12,
  overflow: "hidden",
  backgroundColor: deprecatedTheme.colors.lightGray,
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
  backgroundColor: setBrightness(deprecatedTheme.colors.info, 145),
}

const breakdownTextStyle = {
  ...deprecatedTheme.typography.small,
  lineHeight: 1,
  color: deprecatedTheme.colors.gray,
  position: "relative",
  top: 1,
  fontWeight: 400,
  padding: `${deprecatedTheme.spacing / 4}px ${deprecatedTheme.spacing / 2}px`,
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
