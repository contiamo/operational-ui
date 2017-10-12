export default [
  {
    name: "start",
    description: "Start date in the format 2012-10-01.",
    defaultValue: "-",
    type: "string",
    optional: true
  },
  {
    name: "end",
    description: "End date in the format 2012-10-01.",
    defaultValue: "-",
    type: "string",
    optional: true
  },
  {
    name: "onChange",
    description: "Triggered every time the start or end dates change.",
    type: "(change: {start: string, end: string}) => void",
    defaultValue: "-",
    optional: true
  },
  {
    name: "placeholder",
    description: "Placeholder text when no dates selected",
    defaultValue: "",
    type: "string",
    optional: true
  }
]
