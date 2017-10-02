import * as React from "react"

export default {
  Timeline: [],
  TimelineItem: [
    {
      name: "color",
      description: "It can be a named theme color or a hex value.",
      defaultValue: "info",
      type: "string",
      optional: true
    },
    {
      name: "icon",
      description: "Icon name, see https://feathericons.com/ (convert name to PascalCase)",
      defaultValue: "''",
      type: "string",
      optional: true
    }
  ]
}
