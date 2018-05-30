import * as React from "react"
import { Input } from "@operational/components"

import * as constants from "../../constants"
import { Subsection } from "../../components"

export const title = "Inputs"

export const docsUrl = `${constants.docsBaseUrl}/#input`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Inputs.tsx`

export class Component extends React.Component<{}, { isLocked: boolean }> {
  state = {
    isLocked: true,
  }

  render() {
    return (
      <>
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
          <Input
            value="disabled"
            label="Some value"
            disabled={this.state.isLocked}
            onToggle={() => {
              this.setState(prevState => ({ isLocked: !prevState.isLocked }))
            }}
            hint="Abcd"
          />
        </Subsection>
      </>
    )
  }
}
