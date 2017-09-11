import * as colorCalculator from "tinycolor2"

function hexOrColor(color: string): (fallback: string) => string {
  /*
      Allow for named colors from the theme, AND hex codes.
      Test for #f00b4r, or just #foo. If it doesn't match,
      check for a named color in the theme.

      Usage: hexOrColor("MY COLOR LOL")("#foob47") where the
      first argument is a string that could possibly be a hex code.
      If it IS a hex code, use it. If not, use the hex code in the
      returned function.
    */
  const hexRegEx = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,
    isColorACodeOrHex = hexRegEx.test(color)

  return (fallback: string) => isColorACodeOrHex ? color : fallback
}
const readableTextColor = (background: string) => (
    workingColors: string[]
  ): string => {
    return colorCalculator.mostReadable(background, workingColors).toHexString()
  },
  darken = (color: string) => (percentage: number): string =>
    colorCalculator(color).darken(percentage).toString()

export { hexOrColor, readableTextColor, darken }
