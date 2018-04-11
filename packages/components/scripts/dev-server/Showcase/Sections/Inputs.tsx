import * as React from "react"
import { Input } from "@operational/components"

export default () => (
  <React.Fragment>
    <div>
      <Input value="Input field" label="Label" labelId="inputid" id="1234" />
      <Input
        value="schema xyz"
        id="1234"
        error="Name cannot contain spaces"
        label="Some label"
        hint="Should be variable-safe"
      />
    </div>
    <div>
      <Input value="disabled" label="Some value" disabled onToggle={() => {}} hint="Abcd" />
    </div>
  </React.Fragment>
)
