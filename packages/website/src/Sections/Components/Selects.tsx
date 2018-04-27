import * as React from "react"
import { Select } from "@operational/components"

export const title = "Records"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/record.md"

export const Component = () => (
  <React.Fragment>
    <Select label="Select Label" options={[{ value: "Option 1" }, { value: "Option 2" }]} value="Option 1" />
  </React.Fragment>
)
