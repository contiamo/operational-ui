export default [
  {
    name: "color",
    description: "A hex value or a named color from your theme.",
    defaultValue: 'The greys["100"] in your theme.',
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
    name: "*children*",
    description: "What would you like to say in the tooltip?",
    defaultValue: "",
    type: "string",
    optional: false
  },
  {
    name: "betaFixOverflow",
    description:
      "If enabled, the component rerenders with fixed positioning so that the tooltip is visible even if the parent has an overflow: hidden set. Note that this will only look good if the tooltip's element is small and disappears on mouse leave. Currently, `mouseenter` and `mouseleave` logic is up to the library user.",
    defaultValue: "false",
    type: "boolean",
    optional: true
  }
]
