import * as React from "react"
import glamorous from "glamorous"
import { Table } from "@operational/components"

const sharedPropDescription = [
  {
    name: "className",
    description: "CSS class name added to the component",
    defaultValue: "-",
    type: "string",
    optional: true
  },
  {
    name: "css",
    description: "A glamorous css object additionally applied to the container",
    defaultValue: "-",
    type: "object",
    optional: true
  }
]

export default ({ props }) => (
  <Table
    columns={["Name", "Description", "Default", "Type", "Optional"]}
    rows={[...sharedPropDescription, ...props].map(({ name, description, defaultValue, type, optional }) => [
      name,
      description,
      defaultValue,
      type,
      optional ? "✅" : "🚫"
    ])}
  />
)
