import * as React from "react"
import { Table } from "@operational/components"

export const title = "Tables"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/table.md"

export const Component = () => (
  <React.Fragment>
    <Table rows={[["Paul", "The 12th", "Green"]]} columns={["Name", "Birthday", "Favorite color"]} />
    <Table rows={[]} columns={["Name", "Birthday", "Favorite color"]} />
  </React.Fragment>
)
