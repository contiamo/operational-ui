export default [
  {
    name: "paused",
    description: "By setting this prop, the animation can be stopped and started again from the same position.",
    defaultValue: "false",
    type: "boolean",
    optional: true
  },
  {
    name: "complete",
    description:
      "If the animation is not marked as complete, the progress bar starts at 80%. Otherwise, it is set to go all the way to the right.",
    defaultValue: "false",
    type: "boolean",
    optional: true
  }
]
