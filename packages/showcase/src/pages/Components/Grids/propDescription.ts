export default [
  {
    name: "rows",
    description:
      "A list of row dimensions, either a string ('auto', '20%') or a numerical value, which indicates pixels.",
    defaultValue: "['auto', 'auto']",
    type: "(string || number)[]",
    optional: true
  },
  {
    name: "columns",
    description:
      "A list of column dimensions, either a string ('auto', '20%') or a numerical value, which indicates pixels.",
    defaultValue: "['auto', 'auto']",
    type: "(string || number)[]",
    optional: true
  },
  {
    name: "gap",
    description: "Grid gap",
    defaultValue: "theme.spacing",
    type: "number",
    optional: true
  },
  {
    name: "children",
    description: "Child elements.",
    defaultValue: "-",
    type: "ReactElement[]",
    optional: true
  }
]
