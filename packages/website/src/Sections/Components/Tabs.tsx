import * as React from "react"
import { Tabs, Tab } from "@operational/components"
import * as constants from "../../constants"

export const title = "Tabs"

export const docsUrl = `${constants.docsBaseUrl}/#tabs`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Tabs.tsx`

export class Component extends React.Component<{}, { tab: number }> {
  state = {
    tab: 0,
  }

  render() {
    return (
      <>
        <Tabs
          active={this.state.tab}
          onChange={(tab: number) => {
            this.setState(() => ({ tab }))
          }}
        >
          <Tab title="Tab 1">Content 1</Tab>
          <Tab title="Tab 2">Content 2</Tab>
          <Tab title="Tab 3">Content 3</Tab>
        </Tabs>
      </>
    )
  }
}
