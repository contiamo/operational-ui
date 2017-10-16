import * as colorCalculator from "tinycolor2"

const hexOrColor = (color: string): ((fallback: string) => string) => {
  /*
      Allow for named colors from the theme, AND hex codes.
      Test for #f00b4r, or just #foo. If it doesn't match,
      check for a named color in the theme.

      Usage: hexOrColor("MY COLOR LOL")("#foob47") where the
      first argument is a string that could possibly be a hex code.
      If it IS a hex code, use it. If not, use the hex code in the
      returned function.
    */
  const hexRegEx = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i
  const isColorACodeOrHex = hexRegEx.test(color)

  return (fallback: string) => (isColorACodeOrHex ? color : fallback)
}

const getBrightestColor = (colors: ColorFormats.HSLA[]): ColorFormats.HSLA =>
  colors.reduce((acc, curr) => {
    if (curr.l > acc.l) {
      return curr
    }
    return acc
  })

const readableTextColor = (background: string) => (workingColors: string[]): string => {
  const backgroundHsl = colorCalculator(background).toHsl()
  const workingColorHsls = workingColors.map(color => colorCalculator(color).toHsl())
  // For reasonably saturated colors on the bright side, still pick the lightest color.
  if (backgroundHsl.s > 0.4 && backgroundHsl.l < 0.75) {
    return colorCalculator(getBrightestColor(workingColorHsls)).toHexString()
  }
  return colorCalculator.mostReadable(background, workingColors).toHexString()
}

const darken = (color: string) => (percentage: number): string =>
  colorCalculator(color)
    .darken(percentage)
    .toString()

const lighten = (color: string) => (percentage: number): string =>
  colorCalculator(color)
    .lighten(percentage)
    .toString()

const transparentize = (color: string) => (percentage: number): string =>
  (({ r, g, b }) => {
    return `rgba(${r}, ${g}, ${b}, ${255 * (100 - percentage) / 100})`
  })(colorCalculator(color).toRgb())

export { hexOrColor, readableTextColor, darken, lighten, transparentize }
