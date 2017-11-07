export default {
  Input: [
    {
      name: "value",
      description:
        "The current value of the input field. You must always supply this from the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components.",
      defaultValue: "",
      type: "string",
      optional: false
    },
    {
      name: "onChange",
      description:
        "Callback called when the input changes, with the new value as a string. This is used to update the value in the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components.",
      defaultValue: "",
      type: "Func",
      optional: true
    },
    {
      name: "placeholder",
      description: "Text displayed when the input field has no value.",
      defaultValue: '""',
      type: "string",
      optional: true
    },
    {
      name: "name",
      description: "The name used to refer to the input, for forms.",
      defaultValue: "",
      type: "string",
      optional: true
    },
    {
      name: "disabled",
      description: "Disabled input",
      defaultValue: "null",
      type: "boolean",
      optional: true
    }
  ],
  Select: [
    {
      name: "options",
      description:
        "An array of options to present to the user. This can be an empty array that is later populated onClick of the Select component using the onClick prop (described below) to fetch options beforehand.",
      defaultValue: "[]",
      type: "Array",
      optional: false
    },
    {
      name: "onClick",
      description:
        "A function that is called before the Select component opens. Useful for retrieving options to present to the user.",
      defaultValue: "",
      type: "func",
      optional: true
    },
    {
      name: "placeholder",
      description: "A string displayed to the user when nothing is selected",
      defaultValue: "",
      type: "string",
      optional: true
    },
    {
      name: "disabled",
      description: "Is the select box disabled?",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "multiple",
      description:
        "Is it possible to select more than one option? This turns the `value` of the Select component into an array of Options instead of a single Option object",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "filterable",
      description: "Can the options be filtered?",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "onFilter",
      description:
        "A function that is invoked before the options are filtered. Useful to fetch new options based on the filter.",
      defaultValue: "",
      type: "func",
      optional: true
    }
  ]
}
