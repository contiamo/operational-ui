import * as React from "react"
import { Input } from "@operational/components"

import { Subsection } from "../components"

export const title = "Inputs"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/input.md"

export const Component = () => (
  <React.Fragment>
    <Subsection>
      <Input value="Input field" label="Label" labelId="inputid" id="1234" />
      <Input
        value="schema xyz"
        id="1234"
        error="Name cannot contain spaces"
        label="Some label"
        hint="Should be variable-safe"
      />
    </Subsection>
    <Subsection>
      <Input value="disabled" label="Some value" disabled onToggle={() => {}} hint="Abcd" />
    </Subsection>
  </React.Fragment>
)
