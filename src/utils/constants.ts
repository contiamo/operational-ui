import get from "lodash/get"

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
  /** `#2a2e37` */
  dark: "#2a2e37",
  /** `#999` */
  mediumDark: "#999",
  /** `#d9dfe3` */
  light: "#d9dfe3",
  /** `#f2f4f6` */
  lighter: "#f2f4f6",
  /** `#f8f8f8` */
  lightest: "#f8f8f8",
  /** `#fcfcfc` */
  almostWhite: "#fcfcfc",
}

/**
 * A specialized color palette for separators.
 */
const separatorColors = {
  /** `#768f9e` */
  dark: "#768f9e",
  /** `#bfcbd2` */
  default: "#bfcbd2",
  /** `#d7dfe3` */
  light: "#d7dfe3",
}

/**
 * A specialized color palette for typography.
 */
const textColors = {
  /** `#333` */
  dark: "#333",
  /** `#545454` */
  default: "#545454",
  /** `#c0c0c0` */
  disabled: "#c0c0c0",
  /** `#666` */
  light: "#666",
  /** `#747474` */
  lighter: "#747474",
  /** `#909090` */
  lightest: "#909090",
  /** primary color */
  action: primaryColor,
  white: whiteColor,
}

/**
 * A specialized color palette for borders.
 */
const borderColors = {
  /** `#c0c0c0` */
  default: "#c0c0c0",
  /** `#ddd` */
  select: "#ddd",
  /** `#d8d8d8` */
  disabled: "#d8d8d8",
  /** `#eee` */
  invisible: "#eee",
  /** `#eee` */
  medium: "#e5e5e5",
  /** `#f3f3f3` */
  lightest: "#f3f3f3",
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
  /** `#292e37` */
  primaryDark: "#292e37",
  /** `#f5f5f5` */
  disabled: "#f5f5f5",
  /** `#ffbd41` */
  warning: "#ffbd41",
  /** `#0c991d` */
  success: "#0c991d",
  /** `#9a0000` */
  error: "#9a0000",
  /** `#636363` */
  basic: "#636363",
  ghost: "hsla(0, 0%, 100%, 0.33)",
  white: whiteColor,
  /** `#fff26666` */
  highlight: "#fff26666",
  /** `#000` */
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
  /** 1.4 */
  lineHeight: 1.4,
  size: {
    /** 20px */
    title: 20,

    /** 14px */
    body: 14,

    /** 13px */
    small: 13,

    /** 12px */
    fineprint: 12,

    /** 11px */
    tiny: 11,

    /** 10px */
    tag: 10,
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
export const space = {
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
  /** `0` */
  default: 0,
  /** `300` */
  selectOptions: 300,
  /** `299` */
  formFieldError: 299,
  /** `400` */
  tooltip: 400,
  /** `500` */
  modal: 500,
  /** `600` */
  confirm: 600,
  /** `1000` */
  debugViewer: 1000,
  /** `299` */
  globalProgress: 299,
  /** `2000` */
  messages: 2000,
  /** `100` */
  switch: 100,
}

/**
 * Shadows to apply to elements
 */
const shadows = {
  pressed: "inset 0 1px 1px rgba(0,0,0,0.15)",
  topBar: "0px 1px 5px #d3d1d1",
  focus: "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(82,168,236,.6)",
  insetFocus: "inset 0 0 0px 2px #1499ce",
  popup: "0 3px 12px rgba(0, 0, 0, .15)",
  card: "0 1px 3px 0 rgba(191, 203, 210, 0.9)",
}

const constants = {
  font,
  space,
  zIndex,
  color,
  shadows,
  /**
   * The round borders on things like cards.
   *
   * Default is `2`.
   */
  borderRadius: 2,
  compactSidebarWidth: 80,
  sidebarWidth: 220,
  topbarHeight: 48,
  titleHeight: 50,
  tabsBarHeight: 48,
  pageSize: {
    min: 800,
    max: 1000,
  },
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
  if (String(colorToBeExpanded).includes(".")) {
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
