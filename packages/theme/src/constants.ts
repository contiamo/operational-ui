/**
 * # Operational UI's styling constants.
 *
 * Operational UI is a provider of _opinionated_ building blocks for
 * data-driven user interfaces. Below are centralized _opinions_
 * that we've made that allow for the creation and styling of such
 * building blocks.
 *
 * The opinions are divided into:
 * - Colors
 * - Typography
 * - Space
 *
 * and are used widely throughout the library.
 */

/**
 * Operational UI uses a selection of greys
 * to achieve subtle, yet effective shading
 * effects and readable typography.
 */
export type Grey =
  | 96 // #f6f6f6
  | 93 // #ececec
  | 91 // #e8e8e8
  | 75 // #c0c0c0
  | 56 // #909090
  | 45 // #747474
  | 40 // #666
  | 33 // #545454
  | 24 // #3e3e3e
  | 20 // #333

export type HslValue = string

export interface OperationalBackgroundColors {
  readonly dark: HslValue
  readonly light: HslValue
  readonly lighter: HslValue
}

export interface OperationalSeparatorColors {
  readonly default: HslValue
  readonly light: HslValue
}

export interface OperationalTextColors {
  readonly dark: HslValue
  readonly default: HslValue
  readonly light: HslValue
  readonly lighter: HslValue
  readonly lightest: HslValue
  readonly action: HslValue
  readonly white: HslValue
}

export interface OperationalBorderColors {
  readonly default: HslValue
  readonly disabled: HslValue
}

export interface OperationalColors {
  readonly primary: HslValue
  readonly disabled: HslValue
  readonly success: HslValue
  readonly error: HslValue
  readonly basic: HslValue
  readonly ghost: HslValue
  readonly white: HslValue
  readonly black: HslValue
  readonly background: OperationalBackgroundColors
  readonly separators: OperationalSeparatorColors
  readonly text: OperationalTextColors
  readonly border: OperationalBorderColors
  readonly grey: (grey: Grey) => HslValue
}

export interface OperationalFontFamily {
  readonly main: string
  readonly code: string
}

export interface OperationalFontSize {
  readonly title: number
  readonly body: number
  readonly small: number
  readonly fineprint: number
}

export interface OperationalFont {
  readonly family: OperationalFontFamily
  readonly size: OperationalFontSize
}

export interface OperationalSpace {
  readonly base: number
  readonly small: number
  readonly content: number
  readonly element: number
  readonly big: number
}

export interface OperationalStyleConstants {
  readonly color: OperationalColors
  readonly font: OperationalFont
  readonly space: OperationalSpace
  readonly borderRadius: number
}

const makeConstants = (): OperationalStyleConstants => ({
  font,
  space,
  color: {
    ...colors,
    background: backgroundColors,
    separators: separatorColors,
    text: textColors,
    border: borderColors,
  },
  borderRadius: 2,
})

/**
 * A collection of colors used throughout the library.
 * We've chosen HSL syntax for color descriptions because they
 * allow for fine tuning and allow a more transparent way to
 * observe color variation, verbosely describing the hue,
 * saturation, and lightness of a color.
 *
 * hsla is used where alpha blending is involved.
 */
const colors = {
  primary: "hsl(197, 82%, 44%)",
  disabled: "hsl(0, 0%, 96%)",
  success: "hsl(127, 86%, 36%)",
  error: "hsl(0, 100%, 30%)",
  basic: "hsl(0, 0%, 39%)",
  ghost: "hsla(0, 0%, 100%, 0.2)",
  white: "hsl(0, 0%, 100%)",
  black: "hsl(0, 0%, 0%)",
  /**
   * Greys exist on a spectrum of 0-100.
   *
   * Current _official_ greys are:
   * 96, 93, 56, 45, 40, 33, 24, 20
   */
  grey: (lightness: Grey) => `hsl(0, 0%, ${lightness}%)`,
}

/**
 * A specialized color palette for backgrounds.
 */
const backgroundColors: OperationalBackgroundColors = {
  dark: colors.grey(24),
  light: colors.grey(93),
  lighter: colors.grey(96),
}

/**
 * A specialized color palette for separators.
 */
const separatorColors: OperationalSeparatorColors = {
  default: colors.grey(91),
  light: colors.grey(93),
}

/**
 * A specialized color palette for typography.
 */
const textColors: OperationalTextColors = {
  dark: colors.grey(20),
  default: colors.grey(33),
  light: colors.grey(40),
  lighter: colors.grey(45),
  lightest: colors.grey(56),
  action: colors.primary,
  white: colors.white,
}

/**
 * A specialized color palette for borders.
 */
const borderColors: OperationalBorderColors = {
  default: colors.grey(75),
  disabled: colors.grey(91),
}

/**
 * Font definitions and sizes available for use
 * throughout Operational UI.
 */
const font: OperationalFont = {
  family: {
    main: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    code: "Menlo, monospace",
  },
  size: {
    title: 18,
    body: 14,
    small: 13,
    fineprint: 12,
  },
}

/**
 * A container of space-related constants to be
 * used throughout Operational UI.
 */
const space: OperationalSpace = {
  base: 4,
  small: 8,
  content: 16,
  element: 20,
  big: 28,
}

export default makeConstants()
