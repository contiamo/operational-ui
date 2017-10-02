export default [
  {
    name: "label",
    description: "What is the key in the key-value pairing? This is the description of the statistic itself.",
    defaultValue: "",
    type: "string",
    optional: false
  },
  {
    name: "color",
    description:
      "See above. A stat can have its own background color. This can be a hex code, or a named color from your theme.",
    defaultValue: "white",
    type: "string",
    optional: true
  },
  {
    name: "icon",
    description: "React Feather icon name. See `Icon` component.",
    defaultValue: "",
    type: "string",
    optional: true
  },
  {
    name: "onIconClick",
    description: "Method triggered when the icon is clicked.",
    defaultValue: "",
    type: "function",
    optional: true
  }
]
