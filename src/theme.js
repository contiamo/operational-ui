// @flow
const THEME_COLORS: COLORS = {
  primary: "#22205F",
  accent: "#3333FF",
  secondary: "#00CB98",
  tertiary: "#FFFF98",
  warn: "#DE1A1A"
}

const THEME_GREYS: GREYS = {
  "10": "#EFF1F5",
  "20": "#DFE5EC",
  "30": "#D0D9E5",
  "40": "#C6D1E1",
  "50": "#BBCADC",
  "60": "#A1B3CA",
  "70": "#8092B0",
  "80": "#67809F",
  "90": "#445873",
  "100": "#2D3842",
  white: "#FFFFFF"
}

const DEFAULT_THEME: THEME = {
  colors: THEME_COLORS,
  greys: THEME_GREYS,
  fonts: {
    fontFamily: "Proxima Nova",
    fontSize: 13,
    WebkitFontSmoothing: "subpixel-antialiased",
    textRendering: "optimizeLegibility"
  },
  spacing: 16,
  baseZIndex: 0
}

export default DEFAULT_THEME
