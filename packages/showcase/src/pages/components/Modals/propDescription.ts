export default [
  {
    name: "childCss",
    description:
      "Glamor CSS object passed down to the container's immediate child, which holds the content. Use to specify/override styles",
    defaultValue: "-",
    type: "string",
    optional: true
  },
  {
    name: "childClassName",
    description:
      "Class name for the modal container's immediate child, which holds the content. Use to specify/override styles.",
    defaultValue: "-",
    type: "string",
    optional: true
  },
  {
    name: "onClose",
    description: "Callback called when the modal is closed (outside area is clicked).",
    defaultValue: "-",
    type: "string",
    optional: true
  }
]
