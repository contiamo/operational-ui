import * as React from "react"

export default [
  {
    name: "color",
    description: "A hex value or a named color from your theme.",
    defaultValue: "The greys[\"100\"] in your theme.",
    type: "string",
    optional: true
  },
  {
    name: "active",
    description: "Is the tooltip currently visible? This is toggle onMouseEnter of the Tooltip's parent",
    defaultValue: "false",
    type: "boolean",
    optional: true
  },
  {
    name: "anchor",
    description:
      "Should the tooltip be anchored to the middle or bottom of its parent? For bottom anchoring, mouse over the guy on the lower left of this page.",
    defaultValue: "middle",
    type: "middle | bottom",
    optional: true
  },
  {
    name: <em>children</em>,
    description: "What would you like to say in the tooltip?",
    defaultValue: "",
    type: "string",
    optional: false
  }
]
