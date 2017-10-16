export default [
  {
    name: "color",
    description: "Spinner of the color, as a hex value or a color palette code.",
    defaultValue: "info",
    type: "string",
    optional: true
  },
  {
    name: "size",
    description: "Spinner size, either as a number (pixels), or a different unit as string.",
    defaultValue: "40",
    type: "number | string",
    optional: true
  },
  {
    name: "spinDuration",
    description:
      "You can override the amount of time it takes for the spinner to take a full turn. While this is generally discouraged among spinners of the same size, small tweaks are sometimes aesthetically justified.",
    defaultValue: "2",
    type: "number",
    optional: true
  }
]
