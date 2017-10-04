export default [
  {
    name: "number",
    description: "A number by which the breakdown is represented.",
    defaultValue: "-",
    type: "number",
    optional: false
  },
  {
    name: "label",
    description: "A statistic number label within the bar of the breakdown",
    defaultValue: "-",
    type: "string",
    optional: false
  },
  {
    name: "fill",
    description:
      "The percentage to fill the bar. This is typically passed in from a container component that calculates percentages at large.",
    defaultValue: "-",
    type: "number",
    optional: false
  },
  {
    name: "color",
    description: "A theme palette color name, or a hex code that the bar will be colored with.",
    defaultValue: "*info*",
    type: "string",
    optional: true
  },
  {
    name: "icon",
    description: "An icon that is displayed on the breakdown",
    defaultValue: "-",
    type: "string",
    optional: true
  },
  {
    name: "onMouseEnter/onMouseLeave",
    description:
      "Functions that are invoked when the mouse enters and/or leaves the breakdown. Useful for tooltips/infowindows",
    defaultValue: "-",
    type: "func",
    optional: true
  }
]
