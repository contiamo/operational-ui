import { css } from "glamor"
import { operational as theme } from "@operational/theme"
import { setBrightness } from "@operational/utils"

const breakdownStyle = {
  maxWidth: "350px",
  padding: "6px",
  background: "white",
}

const breakdownsContainerStyle = {
  width: "350px",
  float: "left",
  padding: "7px 0",
}

const breakdownContainerStyle = {
  padding: `${theme.spacing / 2}px`,
  background: theme.colors.white,
  width: "49%",
  float: "left",
}

const breakdownLabelStyle = {
  ...theme.typography.small,
  display: "block",
  marginBottom: theme.spacing / 4,
}

const breakdownCommentLabelStyle = {
  marginLeft: "6px",
}

const breakdownBackgroundBarStyle = {
  position: "relative",
  width: "100%",
  fontSize: 12,
  overflow: "hidden",
  backgroundColor: theme.colors.lightGray,
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
  backgroundColor: setBrightness(theme.colors.info, 145),
}

const breakdownTextStyle = {
  ...theme.typography.small,
  color: theme.colors.gray,
  position: "relative",
  top: 1,
  fontWeight: 400,
  padding: `${theme.spacing / 4}px ${theme.spacing / 2}px`,
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
