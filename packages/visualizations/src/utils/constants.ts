/**
 * # Operational UI's visualization styling constants.
 *
 */

// Pre-defined visualization color palettes.
const palettes = {
  qualitative: {
    generic: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6"],
    pastel: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9"],
    operational: [
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
  },
  sequential: {
    cool: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
    sharp: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
    intense: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
  },
  diverging: {
    rainbow: ["#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd"],
    earthy: ["#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e"],
  },
}

const axisColors = {
  border: "#adadad",
  rules: "#e8e8e8",
  label: "#999999",
}

const focusColors = {
  label: "#2f3435",
  stroke: "#999999",
}

const colors = {
  axis: axisColors,
  focus: focusColors,
  white: "#ffffff",
  primary: "#1499ce",
  lightGrey: "#e8e8e8",
}

const font = {
  color: "#999999",
  small: {
    lineHeight: "1.5",
    textTransform: "none",
    letterSpacing: "normal",
    fontSize: 12,
    fontWeight: 400,
  },
  family:
    "Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
}

/**
 * A container of space-related constants to be
 * used throughout Operational UI.
 */
const space = {
  /** Small space is `4px` */
  small: 4,

  /** Default space is `8px` */
  default: 8,
}

const constants = {
  palettes,
  colors,
  font,
  space,
  borderRadius: 4,
}

export default constants
