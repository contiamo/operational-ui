import * as React from "react"
import { Table } from "@operational/components"

export default () => (
  <React.Fragment>
    <Table rows={[["Paul", "The 12th", "Green"]]} columns={["Name", "Birthday", "Favorite color"]} />
    <Table rows={[]} columns={["Name", "Birthday", "Favorite color"]} />
  </React.Fragment>
)
