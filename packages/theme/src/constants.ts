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

// These constants are shared across many object definitions.
const grey = (lightness: Grey) => `hsl(0, 0%, ${lightness}%)`
const primaryColor = "hsl(197, 82%, 44%)"
const whiteColor = "hsl(0, 0%, 100%)"

/**
 * A specialized color palette for backgrounds.
 */
const backgroundColors = {
  dark: grey(24),
  light: grey(93),
  lighter: grey(96),
}

/**
 * A specialized color palette for separators.
 */
const separatorColors = {
  default: grey(91),
  light: grey(93),
}

/**
 * A specialized color palette for typography.
 */
const textColors = {
  dark: grey(20),
  default: grey(33),
  light: grey(40),
  lighter: grey(45),
  lightest: grey(56),
  action: primaryColor,
  white: whiteColor,
}

/**
 * A specialized color palette for borders.
 */
const borderColors = {
  default: grey(75),
  disabled: grey(91),
}

/**
 * A collection of colors used throughout the library.
 * We've chosen HSL syntax for color descriptions because they
 * allow for fine tuning and allow a more transparent way to
 * observe color variation, verbosely describing the hue,
 * saturation, and lightness of a color.
 *
 * hsla is used where alpha blending is involved.
 */
const color = {
  /**
   * Greys exist on a spectrum of 0-100.
   *
   * Current _official_ greys are:
   * 96, 93, 56, 45, 40, 33, 24, 20
   */
  grey,
  primary: primaryColor,
  disabled: "hsl(0, 0%, 96%)",
  success: "hsl(127, 86%, 36%)",
  error: "hsl(0, 100%, 30%)",
  basic: "hsl(0, 0%, 39%)",
  ghost: "hsla(0, 0%, 100%, 0.2)",
  white: whiteColor,
  black: "hsl(0, 0%, 0%)",
  background: backgroundColors,
  separators: separatorColors,
  text: textColors,
  border: borderColors,
}

/**
 * Font definitions and sizes available for use
 * throughout Operational UI.
 */
const font = {
  family: {
    main: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    code: "Menlo, monospace",
  },
  size: {
    /** 18px */
    title: 18,

    /** 14px */
    body: 14,

    /** 13px */
    small: 13,

    /** 12px */
    fineprint: 12,
  },
}

/**
 * A container of space-related constants to be
 * used throughout Operational UI.
 */
const space = {
  /** Base space is `4px` */
  base: 4,

  /** Small space is `8px` */
  small: 8,

  /** Content space is `16px` */
  content: 16,

  /** Element space is `20px` */
  element: 20,

  /** Big space is `28px` */
  big: 28,
}

/**
 * One zIndex to rule them all
 */
const zIndex = {
  default: 0,
  selectOptions: 300,
  formFieldError: 299,
}

const constants = {
  font,
  space,
  zIndex,
  color,
  borderRadius: 2,
  sidebarWidth: 256,
  titleHeight: 45,
}

export type OperationalStyleConstants = Readonly<typeof constants>

export default constants
