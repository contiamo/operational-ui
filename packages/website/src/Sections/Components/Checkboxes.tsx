import * as React from "react"
import { Checkbox } from "@operational/components"
import * as constants from "../../constants"

export const title = "Checkboxes"

export const docsUrl = `${constants.docsBaseUrl}/components/checkbox.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Checkboxes.tsx`

export class Component extends React.Component<{}, { selected: string[] }> {
  state = {
    selected: ["Option 1"],
  }

  render() {
    return (
      <>
        <Checkbox
          options={["Option 1", "Option 2", "Option 3"]}
          selected={this.state.selected}
          onChange={(selected: string[]) => {
            this.setState(prevState => ({ selected }))
          }}
        />
      </>
    )
  }
}
