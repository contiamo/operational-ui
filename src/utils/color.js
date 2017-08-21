// @flow
import colorCalculator from "tinycolor2"

const hexOrColor = (color: string) => {
    /*
      Allow for named colors from the theme, AND hex codes.
      Test for #f00b4r, or just #foo. If it doesn't match,
      check for a named color in the theme.
    */
    const hexRegEx = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,
      isColorACodeOrHex = hexRegEx.test(color)

    return (fallback: string): string => isColorACodeOrHex ? color : fallback
  },
  readableTextColor = (background: string) => (
    backgroundColors: Array<string> | string
  ): string => {
    let workingColors: Array<string>

    backgroundColors.constructor !== Array
      ? workingColors = [...arguments]
      : workingColors = [...backgroundColors]

    return colorCalculator
      .mostReadable(background, backgroundColors)
      .toHexString()
  },
  darken = (color: string) => (percentage: number): string =>
    colorCalculator(color).darken(percentage).toString()

export { hexOrColor, readableTextColor, darken }
