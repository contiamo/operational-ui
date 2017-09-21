const THEME_COLORS = {
  primary: "#22205F",
  accent: "#3333FF",
  secondary: "#00CB98",
  tertiary: "#FFFF98",
  warn: "#DE1A1A"
}

const THEME_GREYS = {
  10: "#F5F5F5",
  20: "#F1F1F1",
  30: "#D0D9E5",
  40: "#C6D1E1",
  50: "#BBCADC",
  60: "#999999",
  70: "#8092B0",
  80: "#747474",
  90: "#445873",
  100: "#2D3842",
  white: "#FFFFFF"
}

const baseTypography = {
  lineHeight: "1.5",
  textTransform: "none",
  letterSpacing: 0.2
}

const DEFAULT_TYPOGRAPHY: ThemeTypography = {
  heading1: {
    ...baseTypography,
    fontSize: 13,
    fontWeight: 700,
    opacity: 1
  },
  heading2: {
    ...baseTypography,
    fontSize: 13,
    fontWeight: 700,
    opacity: 0.6
  },
  body: {
    ...baseTypography,
    fontSize: 13,
    fontWeight: 400,
    opacity: 1
  },
  small: {
    ...baseTypography,
    fontSize: 12,
    fontWeight: 400,
    opacity: 1
  }
}

const DEFAULT_THEME: Theme = {
  colors: THEME_COLORS,
  greys: THEME_GREYS,
  typography: DEFAULT_TYPOGRAPHY,
  fonts: {
    fontFamily: "Proxima Nova",
    fontSize: 13,
    WebkitFontSmoothing: "subpixel-antialiased",
    textRendering: "optimizeLegibility"
  },
  spacing: 12,
  baseZIndex: 0
}

export default DEFAULT_THEME
