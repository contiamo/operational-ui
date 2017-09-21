type ThemeColorName =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "white"
  | "black"
  | "grey10"
  | "grey20"
  | "grey30"
  | "grey40"
  | "grey50"
  | "grey60"
  | "grey70"
  | "grey80"
  | "grey90"

interface ThemeColors {
  [key: string]: string
  info: string
  success: string
  warning: string
  error: string
  white: string
  black: string
  grey10: string
  grey20: string
  grey30: string
  grey40: string
  grey50: string
  grey60: string
  grey70: string
  grey80: string
  grey90: string
}

interface ThemeTypographyElement {
  fontSize: number
  fontWeight: 100 | 300 | 400 | 600 | 700 | "normal" | "bold" | "bolder" | "lighter" | "initial" | "inherit"
  textTransform: string
  opacity: number
  letterSpacing: number
  lineHeight: string
}

interface ThemeTypography {
  heading1: ThemeTypographyElement
  heading2: ThemeTypographyElement
  body: ThemeTypographyElement
  small: ThemeTypographyElement
}

interface Theme {
  colors: ThemeColors
  typography: ThemeTypography
  fonts: {
    fontFamily: string
    fontSize: number
    WebkitFontSmoothing?: string
    textRendering?: string
  }
  spacing: number
  baseZIndex: number
}
