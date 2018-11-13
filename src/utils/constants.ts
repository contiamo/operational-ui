import get from "lodash/get"
import { operational, Theme } from "./constants/deprecatedTheme"

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

// These constants are shared across many object definitions.
const primaryColor = "#1499cc"
const whiteColor = "#fff"

/**
 * A specialized color palette for backgrounds.
 */
const backgroundColors = {
  dark: "#2a2e37",
  light: "#ececec",
  lighter: "#f6f6f6",
}

/**
 * A specialized color palette for separators.
 */
const separatorColors = {
  default: "#e8e8e8",
  light: "#ececec",
}

/**
 * A specialized color palette for typography.
 */
const textColors = {
  dark: "#333",
  default: "#545454",
  light: "#666",
  lighter: "#747474",
  lightest: "#909090",
  action: primaryColor,
  white: whiteColor,
}

/**
 * A specialized color palette for borders.
 */
const borderColors = {
  default: "#c0c0c0",
  disabled: "#d8d8d8",
}

/**
 * A collection of colors used throughout the library.
 * We've chosen HEX syntax for color descriptions to ensure consistency
 * with design colors.
 *
 * hsla is used where alpha blending is involved.
 */
const color = {
  primary: primaryColor,
  disabled: "#f5f5f5",
  warning: "#ffbd41",
  success: "#0c991d",
  error: "#9a0000",
  basic: "#636363",
  ghost: "hsla(0, 0%, 100%, 0.33)",
  white: whiteColor,
  black: "#000",
  background: backgroundColors,
  separators: separatorColors,
  text: textColors,
  border: borderColors,
  palette: [
    "#1499CE",
    "#7C246F",
    "#EAD63F",
    "#343972",
    "#ED5B17",
    "#009691",
    "#1D6199",
    "#D31F1F",
    "#AD329C",
    "#006865",
  ],
}

type FontWeight = 400 | 500 | 600

/**
 * Font definitions and sizes available for use
 * throughout Operational UI.
 */
const font = {
  family: {
    main: `"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif`,
    code: "Menlo, monospace",
  },
  lineHeight: 1.4,
  size: {
    /** 16px */
    title: 16,

    /** 14px */
    body: 14,

    /** 13px */
    small: 13,

    /** 12px */
    fineprint: 12,
  },
  weight: {
    /** 400 */
    regular: 400 as FontWeight,

    /** 500 */
    medium: 500 as FontWeight,

    /** 600 */
    bold: 600 as FontWeight,
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

  /** Medium space is `12px` */
  medium: 12,

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
  tooltip: 400,
  modal: 500,
  debugViewer: 1000,
  globalProgress: 299,
}

/**
 * Shadows to apply to elements
 */
const shadows = {
  pressed: "inset 0 1px 1px rgba(0,0,0,0.15)",
  card: "0px 1px 5px #d3d1d1",
  focus: "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.6)",
  popup: "0 3px 12px rgba(0, 0, 0, .15)",
}

const constants = {
  font,
  space,
  zIndex,
  color,
  shadows,
  borderRadius: 2,
  compactSidebarWidth: 90,
  sidebarWidth: 220,
  titleHeight: 50,
  /**
   * This redundant type-casting is necessary to give the typescript compiler access
   * to the `Theme` interface and prevent it from doing incorrect imports for it.
   * @todo look into making this unnecessary.
   */
  deprecated: operational as Theme,
}

/*
 * Expands a color expressed either as a custom hex value
 * or a color key to pick from within the style constants object.
*/
export const expandColor = (
  theme: OperationalStyleConstants,
  colorToBeExpanded?: keyof OperationalStyleConstants["color"] | string,
): string | null => {
  if (!colorToBeExpanded) {
    return null
  }
  if (colorToBeExpanded.includes(".")) {
    return get(theme, colorToBeExpanded, "red")
  }
  const hexRegEx = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{8}$)|(^#[0-9A-F]{4}$)|(^#[0-9A-F]{3}$)|currentColor/i
  const isHex = hexRegEx.test(colorToBeExpanded)
  if (isHex) {
    return colorToBeExpanded
  }

  /**
   * This function is typically used in checks.
   * If falsy, it returns a fallback color, hence
   * the empty string return for a falsy value.
   */
  return (theme.color as any)[colorToBeExpanded] || ""
}

export type OperationalStyleConstants = Readonly<typeof constants>

export default constants

export { expandColor as deprecatedExpandColor } from "./constants/deprecatedTheme"
