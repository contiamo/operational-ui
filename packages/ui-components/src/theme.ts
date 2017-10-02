const palette: Palette = {
  info: "#1499CE",
  success: "#00b34d",
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
  grey90: "#445873",
}

const usageColors: UsageColors = {
  bodyText: "#555f61",
  lightText: "#969696",
  emphasizedText: "#373d3f",
  contentBorder: "#dadada",
  bodyBackground: palette.grey20,
  cardBackground: palette.white,
  contentSeparatorLine: "#f2f2f2",
  subContentSeparatorLine: "#f8f8f8",
}

const colors: ThemeColors = {
  palette,
  usage: usageColors
}

const baseTypography: { lineHeight: string; textTransform: string; letterSpacing: number | "normal" } = {
  lineHeight: "1.5",
  textTransform: "none",
  letterSpacing: "normal",
}

const typography: ThemeTypography = {
  title: {
    ...baseTypography,
    fontSize: 22,
    fontWeight: 600,
  },
  heading1: {
    ...baseTypography,
    fontSize: 13,
    fontWeight: 700,
    color: usageColors.emphasizedText,
  },
  heading2: {
    ...baseTypography,
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase",
    color: usageColors.lightText,
    "&::before": {
      content: "» ",
    },
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

const shadows = {
  pressed: "inset 0 1px 1px rgba(0,0,0,0.15)",
  card: "0px 1px 2px #d3d1d1",
}

const defaultTheme: Theme = {
  typography,
  shadows,
  colors,
  spacing: 12,
  baseZIndex: 0,
}

export default defaultTheme
