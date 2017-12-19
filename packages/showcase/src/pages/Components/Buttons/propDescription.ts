export default [
  {
    name: "color",
    description: "What color of button would you like? It can be a hex value or a named theme color.",
    defaultValue: "white",
    type: "string",
    optional: true
  },
  {
    name: "onClick",
    description: "What happens when the button is clicked?",
    defaultValue: "",
    type: "func",
    optional: true
  },
  {
    name: "active",
    description: "Active state.",
    defaultValue: "",
    type: "boolean",
    optional: true
  },
  {
    name: "condensed",
    description: "Condensed option",
    defaultValue: "",
    type: "boolean",
    optional: true
  },
  {
    name: "disabled",
    description: "Disabled option",
    defaultValue: "",
    type: "boolean",
    optional: false
  }
]
