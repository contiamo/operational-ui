import * as React from "react"
import { Table } from "@operational/components"
import { Theme } from "@operational/theme"

export const title = "Tables"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/table.md"

export const Component = () => (
  <React.Fragment>
    <Table
      onRowClick={console.log.bind(console)}
      rows={[["Paul", "The 12th", "Green"], ["Patrick", "The 11th", "Black"], ["Patrick", "The 11th", "Black"]]}
      columns={["Name", "Birthday", "Favorite color"]}
    />
    <Table rows={[]} columns={["Name", "Birthday", "Favorite color"]} />
  </React.Fragment>
)
