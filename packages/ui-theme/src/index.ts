// Type definitions

export type ThemeColorName =
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

export interface Palette {
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

export interface UsageColors {
  bodyBackground: string
  bodyText: string
  cardBackground: string
  contentBorder: string
  contentSeparatorLine: string
  emphasizedText: string
  lightText: string
  link: string
  sideNavigationBackground: string
  subContentSeparatorLine: string
}

export interface ThemeColors {
  palette: Palette
  usage: UsageColors
}

export interface ThemeShadows {
  pressed: string
  card: string
  focus: string
  popup: string
}

export interface ThemeTypographyElement {
  fontSize: number
  fontWeight: 100 | 300 | 400 | 600 | 700 | "normal" | "bold" | "bolder" | "lighter" | "initial" | "inherit"
  textTransform: string
  letterSpacing: number | "normal"
  lineHeight: string
  color?: string
  "&::before"?: { content: string }
}

export interface ThemeTypography {
  title: ThemeTypographyElement
  heading1: ThemeTypographyElement
  heading2: ThemeTypographyElement
  body: ThemeTypographyElement
  small: ThemeTypographyElement
}

export interface Theme {
  colors: ThemeColors
  typography: ThemeTypography
  fontFamily: string
  spacing: number
  baseZIndex: number
  shadows: ThemeShadows
}

// Default theme definition

const palette: Palette = {
  info: "#1499CE",
  success: "#00b34d",
  warning: "#FFAE00",
  error: "#DE1A1A",
  white: "#FFFFFF",
  black: "#000000",
  grey10: "#F8F8F8",
  grey20: "#e8e8e8",
  grey30: "#D0D0D0",
  grey40: "#C6C6C6",
  grey50: "#BBBBBB",
  grey60: "#999999",
  grey70: "#808080",
  grey80: "#747474",
  grey90: "#444444"
}

const usageColors: UsageColors = {
  bodyBackground: "#F1F1F1",
  bodyText: "#555f61",
  cardBackground: palette.white,
  contentBorder: "#dadada",
  contentSeparatorLine: "#f2f2f2",
  emphasizedText: "#373d3f",
  lightText: "#969696",
  link: palette.info,
  sideNavigationBackground: "#393939",
  subContentSeparatorLine: "#f8f8f8"
}

const colors: ThemeColors = {
  palette,
  usage: usageColors
}

const baseTypography: { lineHeight: string; textTransform: string; letterSpacing: number | "normal" } = {
  lineHeight: "1.5",
  textTransform: "none",
  letterSpacing: "normal"
}

const typography: ThemeTypography = {
  title: {
    ...baseTypography,
    fontSize: 22,
    fontWeight: 600
  },
  heading1: {
    ...baseTypography,
    fontSize: 13,
    fontWeight: 700,
    color: usageColors.emphasizedText
  },
  heading2: {
    ...baseTypography,
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase",
    color: usageColors.lightText,
    "&::before": {
      content: "» "
    }
  },
  body: {
    ...baseTypography,
    fontSize: 13,
    fontWeight: 400
  },
  small: {
    ...baseTypography,
    fontSize: 12,
    fontWeight: 400
  }
}

const shadows: ThemeShadows = {
  pressed: "inset 0 1px 1px rgba(0,0,0,0.15)",
  card: "0px 1px 2px #d3d1d1",
  focus: "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.6)",
  popup: "0 3px 12px rgba(0, 0, 0, .14)"
}

const contiamoTheme: Theme = {
  typography,
  shadows,
  colors,
  spacing: 12,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  baseZIndex: 0
}

export { contiamoTheme }
