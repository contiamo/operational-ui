import * as colorCalculator from "tinycolor2"

const getBrightestColor = (colors: ColorFormats.HSLA[]): ColorFormats.HSLA =>
  colors.reduce((acc, curr) => {
    if (curr.l > acc.l) {
      return curr
    }
    return acc
  })

export const readableTextColor = (backgroundColor: string, workingColors: string[]): string => {
  const backgroundHsl = colorCalculator(backgroundColor).toHsl()
  const workingColorHsls = workingColors.map(color => colorCalculator(color).toHsl())
  if (backgroundHsl.a < 0.5) {
    return "#FFFFFF"
  }
  // For reasonably saturated colors on the bright side, still pick the lightest color.
  if (backgroundHsl.s > 0.4 && backgroundHsl.l < 0.75) {
    return colorCalculator(getBrightestColor(workingColorHsls)).toHexString()
  }
  return colorCalculator.mostReadable(backgroundColor, workingColors).toHexString()
}

export const darken = (color: string, percentage: number): string =>
  colorCalculator(color)
    .darken(percentage)
    .toString()

export const lighten = (color: string, percentage: number): string =>
  colorCalculator(color)
    .lighten(percentage)
    .toString()

export const getBrightness = (color: string): number => {
  const c = colorCalculator(color)
  return c.getBrightness()
}

export const setBrightness = (color: string, targetBrightness: number): string => {
  const c = colorCalculator(color)
  const brightness = c.getBrightness()
  return c.brighten((targetBrightness / brightness) * 100 - 100).toString()
}
