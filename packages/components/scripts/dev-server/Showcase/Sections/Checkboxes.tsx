import * as React from "react"
import { Checkbox } from "@operational/components"

export default () => (
  <React.Fragment>
    <Checkbox options={["Option 1", "Option 2", "Option 3"]} selected={["Option 2"]} />
  </React.Fragment>
)
