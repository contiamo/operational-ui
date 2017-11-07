import { css } from "glamor"

const chartContainerStyle = {
  position: "relative",
  display: "block",
  "&.hidden": {
    display: "none",
  },
}

const focusLegendStyle = {
  userSelect: "none",
  pointerEvents: "none",
  boxShadow: "0px 1px 2px #d3d1d1",
  boxSizing: "content-box",
  borderRadius: 2,
  padding: 7,
  border: "1px solid #cdcdcd",
  position: "absolute",
  zIndex: 3000,
  maxWidth: "350px",
  backgroundColor: "#fff",
  "& ul": {
    listStyle: "none",
    fontSize: 12,
    margin: 0,
    padding: 0,
  },
}

export const chartContainer = css(chartContainerStyle).toString()
export const focusLegend = css(focusLegendStyle).toString()
