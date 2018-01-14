import * as React from "react"
import glamorous from "glamorous"
import { Table } from "@operational/components"

export default ({ props }) => (
  <Table
    columns={["Name", "Description", "Default", "Type", "Optional"]}
    rows={props.map(({ name, description, defaultValue, type, optional }) => [
      name,
      description,
      defaultValue,
      type,
      optional ? "✅" : "🚫"
    ])}
  />
)
