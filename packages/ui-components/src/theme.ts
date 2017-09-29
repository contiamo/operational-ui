const THEME_COLORS: ThemeColors = {
  info: "#1499CE",
  success: "#689F2C",
  warning: "#FFAE00",
  error: "#DE1A1A",
  white: "#FFFFFF",
  black: "#000000",
  grey10: "#F5F5F5",
  grey20: "#F1F1F1",
  grey30: "#D0D9E5",
  grey40: "#C6D1E1",
  grey50: "#BBCADC",
  grey60: "#999999",
  grey70: "#8092B0",
  grey80: "#747474",
  grey90: "#445873"
}

const baseTypography: { lineHeight: string; textTransform: string; letterSpacing: number | "normal" } = {
  lineHeight: "1.5",
  textTransform: "none",
  letterSpacing: "normal"
}

const DEFAULT_TYPOGRAPHY: ThemeTypography = {
  title: {
    ...baseTypography,
    fontSize: 22,
    fontWeight: 600,
    opacity: 1
  },
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
  typography: DEFAULT_TYPOGRAPHY,
  spacing: 12,
  baseZIndex: 0
}

export default DEFAULT_THEME
