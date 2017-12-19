export default [
  {
    name: "color",
    description: "The starting color of the component",
    defaultValue: "blue",
    type: "string<hex>",
    optional: true
  },
  {
    name: "size",
    description: "The size of the color picker.",
    defaultValue: "16",
    type: "number",
    optional: true
  },
  {
    name: "onChange",
    description: "A function that is called when the color changes. It is passed a color object as the first argument.",
    defaultValue: "void",
    type: "func",
    optional: true
  }
]
