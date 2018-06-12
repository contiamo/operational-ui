// Default constants

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
 * A collection of colors used throughout the library.
 * We've chosen HSL syntax for color descriptions because they
 * allow for fine tuning and allow a more transparent way to
 * observe color variation, verbosely describing the hue,
 * saturation, and lightness of a color.
 *
 * hsla is used where alpha blending is involved.
 */
export const color = {
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
  grey: (lightness: 96 | 93 | 56 | 45 | 40 | 33 | 24 | 20) => ({
    main: `hsl(0, 0, ${lightness}%)`,

    /**
     * This is a _really_ naïve contrast check.
     * @todo reconsider this as needs arise.
     */
    contrast: lightness > 50 ? "hsl(0, 0, 0)" : "hsl(0, 0, 100%)",
  }),
}

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

export const space = {
  wide: 28,
  default: 20,
  content: 16,
  basic: 8,
}
