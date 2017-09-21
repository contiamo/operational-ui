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
    defaultValue: null,
    type: "number",
    optional: false
  },
  {
    name: "selected",
    description: "Index of the current selected page",
    defaultValue: '5',
    type: "number",
    optional: true
  },
  {
    name: "onChange",
    description: "Function to be executed after changing page",
    defaultValue: null,
    type: "function",
    optional: false
  }
]
