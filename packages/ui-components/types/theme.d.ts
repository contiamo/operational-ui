interface ThemeColors {
  [key: string]: string
  primary: string
  accent: string
  secondary: string
  tertiary: string
  warn: string
}

interface ThemeGreys {
  "10": string
  "20": string
  "30": string
  "40": string
  "50": string
  "60": string
  "70": string
  "80": string
  "90": string
  "100": string
  white: string
}

interface Theme {
  colors: ThemeColors
  greys: ThemeGreys
  fonts: {
    fontFamily: string
    fontSize: number
    WebkitFontSmoothing?: string
    textRendering?: string
  }
  spacing: number
  baseZIndex: number
}

export default Theme
