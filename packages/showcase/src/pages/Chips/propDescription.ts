export default {
  chip: [
    {
      name: "color",
      description: "What color of chip would you like? It can be a hex value or a named theme color.",
      defaultValue: "The `primary` color of your theme.",
      type: "string",
      optional: true
    },
    {
      name: "symbol",
      description: "The symbol that is shown on mouse over of a clickable chip.",
      defaultValue: "",
      type: "string",
      optional: true
    },
    {
      name: "onClick",
      description:
        "Is this interactive? If yes, what happens when the chip is clicked? This is commonly used to delete a filter in a list of filters.",
      defaultValue: "",
      type: "func",
      optional: true
    }
  ],
  plusChip: [
    {
      name: "color",
      description: "What color of chip would you like? It can be a hex value or a named theme color.",
      defaultValue: "Black",
      type: "string",
      optional: true
    },
    {
      name: "size",
      description: "The size of the chip in pixels. This can vary for obvious reasons.",
      defaultValue: "16",
      type: "number",
      optional: true
    },
    {
      name: "onClick",
      description: "A function that will be called on click of the PlusChip.",
      defaultValue: "",
      type: "func",
      optional: true
    }
  ]
}
