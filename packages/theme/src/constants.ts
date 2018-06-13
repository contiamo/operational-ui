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

/**
 * A collection of colors used throughout the library.
 * We've chosen HSL syntax for color descriptions because they
 * allow for fine tuning and allow a more transparent way to
 * observe color variation, verbosely describing the hue,
 * saturation, and lightness of a color.
 *
 * hsla is used where alpha blending is involved.
 */
export const colors = {
  primary: {
    main: "hsl(197, 82%, 44%)",
    contrast: "hsl(0, 0, 100%)",
  },
  disabled: {
    main: "hsl(0, 0, 96%)",
    contrast: "hsl(0, 0, 56%)",
  },
  success: {
    main: "hsl(127, 86%, 36%)",
    contrast: "hsl(0, 0, 100%)",
  },
  error: {
    main: "hsl(0, 100%, 30%)",
    contrast: "hsl(0, 0, 100%)",
  },
  basic: {
    main: "hsl(0, 0, 39%)",
    contrast: "hsl(197, 82%, 44%)",
  },
  ghost: {
    main: "hlsa(0, 0, 100%, 0.2)",
    contrast: "hsl(0, 0, 100%)",
  },

  /**
   * Greys exist on a spectrum of 0-100.
   *
   * Current _official_ greys are:
   * 96, 93, 56, 45, 40, 33, 24, 20
   */
  grey: (lightness: Grey) => ({
    main: `hsl(0, 0, ${lightness}%)`,

    /**
     * This is a _really_ naïve contrast check.
     * @todo reconsider this as needs arise.
     */
    contrast: lightness > 50 ? "hsl(0, 0, 0)" : "hsl(0, 0, 100%)",
  }),
}

/**
 * A specialized color palette for shadows.
 */
export const shadowColor = {
  dark: colors.grey(24),
  light: colors.grey(93),
  lighter: colors.grey(96),
}

/**
 * A specialized color palette for separators.
 */
export const separatorColor = {
  default: colors.grey(91),
  light: colors.grey(93),
}

/**
 * A specialized color palette for typography.
 */
export const fontColor = {
  dark: colors.grey(20),
  default: colors.grey(33),
  light: colors.grey(40),
  lighter: colors.grey(45),
  lightest: colors.grey(56),
  action: colors.primary,
}

/**
 * A specialized color palette for borders.
 */
export const borderColor = {
  default: colors.grey(75),
  disabled: colors.grey(91),
}

/**
 * Font definitions and sizes available for use
 * throughout Operational UI.
 */
export const font = {
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
export const space = {
  wide: 28,
  default: 20,
  content: 16,
  basic: 8,
}
