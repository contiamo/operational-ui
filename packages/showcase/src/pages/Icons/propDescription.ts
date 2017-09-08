export default [
  {
    name: "name",
    description: "Icon name, see https://feathericons.com/ (convert name to PascalCase).",
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
    name: "sizeOverride",
    description: "Override the size to a single number.",
    defaultValue: null,
    type: "number",
    optional: true
  }
]
