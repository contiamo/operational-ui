export default [
  {
    name: "on",
    description: "Is the switch on?",
    defaultValue: "",
    type: "boolean",
    optional: false
  },
  {
    name: "onChange",
    description: "A change handler. Passes the new `on` boolean.",
    defaultValue: "void",
    type: "func",
    optional: true
  }
]
