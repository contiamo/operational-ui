export default [
  {
    name: "pageCount",
    description: "Total number of pages.",
    defaultValue: null,
    type: "number",
    optional: false
  },
  {
    name: "maxVisible",
    description: "Maximum amount of pages to be displayed.",
    defaultValue: "3",
    type: "number",
    optional: true
  },
  {
    name: "page",
    description: "Index of the current selected page",
    defaultValue: "1",
    type: "number",
    optional: true
  },
  {
    name: "onChange",
    description:
      "Function to be executed after changing page. Receives a single argument which represents the new page number",
    defaultValue: "void",
    type: "function",
    optional: true
  }
]
