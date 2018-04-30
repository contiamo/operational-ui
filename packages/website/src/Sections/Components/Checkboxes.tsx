import * as React from "react"
import { Checkbox } from "@operational/components"

export const title = "Checkboxs"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/checkbox.md"

export const Component = () => (
  <React.Fragment>
    <Checkbox options={["Option 1", "Option 2", "Option 3"]} selected={["Option 2"]} />
  </React.Fragment>
)
