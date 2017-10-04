export default [
  {
    name: "name",
    description: "Icon name, see https://feathericons.com (convert name to PascalCase).",
    defaultValue: "Play",
    type: "string",
    optional: false
  },
  {
    name: "size",
    description: "Size as pre-defined strings.",
    defaultValue: "medium",
    type: "string",
    optional: true
  },
  {
    name: "color",
    description: "Icon color, specified as a hex, or a color name (info, success, warning, error).",
    defaultValue: "black",
    type: "string",
    optional: true
  }
]
