import * as React from "react"
import { Switch } from "@operational/components"
import * as constants from "../../constants"

export const title = "Switches"

export const docsUrl = `${constants.docsBaseUrl}/#switch`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Switches.tsx`

export class Component extends React.Component<{}, { on: boolean }> {
  state = {
    on: true,
  }

  render() {
    return (
      <>
        <Switch on={this.state.on} onChange={(on: boolean) => this.setState(() => ({ on }))} />
      </>
    )
  }
}
