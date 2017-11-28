export default [
  {
    name: "children",
    description:
      "contiamo-ui-components forms. Note that the `id` field is mandatory, compared to the case when the form fields are used on their own.",
    defaultValue: "[]",
    type: "ReactNode",
    optional: true
  },
  {
    name: "onClear",
    description:
      "Input fields may be cleared directly from the filter bar, in which case the `onClear` prop is called with the corresponding id. Actually clearing the filter is the responsibility of the parent.",
    defaultValue: "-",
    type: "(id: string) => void",
    optional: true
  }
]
