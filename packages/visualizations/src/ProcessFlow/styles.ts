import { css } from "glamor"

const breakdownStyle = {
  fontFamily: "sans-serif",
  maxWidth: "350px",
  padding: "6px",
  background: "white"
}

const breakdownsContainerStyle = {
  width: "350px",
  float: "left",
  padding: "7px 0"
}

const breakdownContainerStyle = {
  width: "49%",
  float: "left",
  paddingRight: "2%",
  paddingTop: "10px",
  paddingBottom: "10px"
}

const breakdownLabelStyle = {
  display: "block",
  marginBottom: "3px",
  fontSize: "12px"
}

const breakdownCommentLabelStyle = {
  marginLeft: "6px"
}

const breakdownBackgroundBarStyle = {
  position: "relative",
  width: "100%",
  backgroundColor: "rgb(245, 245, 245)",
  overflow: "hidden",
  padding: "0 3px",
  height: "15px",
  fontSize: "13px"
}

const breakdownBarStyle = {
  content: "",
  position: "absolute",
  top: "0px",
  left: "0px",
  zIndex: "0",
  display: "block",
  height: "100%",
  pointerEvents: "none",
  backgroundColor: "#1499CE"
}

const breakdownTextStyle = {
  color: "white",
  position: "relative"
}

const titleStyle = {
  fontWeight: "bold",
  color: "#555",
  "& span": {
    fontWeight: "normal"
  }
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
