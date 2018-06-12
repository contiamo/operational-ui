// Type definitions

export { expandColor } from "./utils"

export type TextTransform = "capitalize" | "full-width" | "lowercase" | "none" | "uppercase"

export type ThemeColorName =
  | "brand"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "white"
  | "black"
  | "gray"
  | "lightGray"
  | "text"
  | "lightText"
  | "linkText"
  | "navBackground"
  | "background"
  | "lighterBackground"
  | "border"
  | "separator"

export interface ThemeColors {
  brand: string
  info: string
  success: string
  warning: string
  error: string
  visualizationPalette: string[]
  white: string
  black: string
  gray: string
  lightGray: string
  background: string
  lighterBackground: string
  navBackground: string
  text: string
  lightText: string
  linkText: string
  border: string
  inputBorder: string
  separator: string
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
  textTransform: TextTransform
  letterSpacing: number | "normal"
  lineHeight: string
  opacity?: number
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
  box: number
  borderRadius: number
  baseZIndex: number
  shadows: ThemeShadows
}

// Default theme definition

const colors: ThemeColors = {
  brand: "#000000",
  info: "#1499CE",
  success: "#00BF3C",
  warning: "#FFAE00",
  error: "#DE1A1A",
  white: "#FFFFFF",
  black: "#000000",
  visualizationPalette: [
    "#2ca02c",
    "#1f77b4",
    "#ff7f0e",
    "#d62728",
    "#9467bd",
    "#17becf",
    "#7f7f7f",
    "#e377c2",
    "#8c564b",
    "#bcbd22",
    "#98df8a",
    "#aec7e8",
    "#ffbb78",
    "#ff9896",
    "#c5b0d5",
    "#9edae5",
    "#c7c7c7",
    "#f7b6d2",
    "#c49c94",
    "#dbdb8d",
  ],
  lightGray: "#e8e8e8",
  gray: "#999999",
  background: "#F5F6FA",
  lighterBackground: "#F9FAFE",
  text: "#2F3435",
  border: "#ADADAD",
  inputBorder: "#D0D9E5",
  lightText: "#969696",
  linkText: "#1499CE",
  navBackground: "#004A75",
  separator: "#f2f2f2",
}

const baseTypography: { lineHeight: string; textTransform: TextTransform; letterSpacing: number | "normal" } = {
  lineHeight: "1.5",
  textTransform: "none",
  letterSpacing: "normal",
}

const typography: ThemeTypography = {
  title: {
    ...baseTypography,
    fontSize: 24,
    fontWeight: 400,
  },
  heading1: {
    ...baseTypography,
    fontSize: 16,
    fontWeight: 400,
  },
  heading2: {
    ...baseTypography,
    fontSize: 16,
    opacity: 0.7,
    fontWeight: 400,
  },
  body: {
    ...baseTypography,
    fontSize: 13,
    fontWeight: 400,
  },
  small: {
    ...baseTypography,
    fontSize: 12,
    fontWeight: 400,
  },
}

const shadows: ThemeShadows = {
  pressed: "inset 0 1px 1px rgba(0,0,0,0.15)",
  card: "0px 1px 3px rgba(0,0,0,.16)",
  focus: "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.6)",
  popup: "0 3px 12px rgba(0, 0, 0, .14)",
}

const operational: Theme = {
  typography,
  shadows,
  colors,
  spacing: 16,
  box: 72,
  borderRadius: 4,
  fontFamily:
    "Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  baseZIndex: 0,
}

export { operational }
