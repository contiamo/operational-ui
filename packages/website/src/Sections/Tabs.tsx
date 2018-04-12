import * as React from "react"
import { Tabs, Tab } from "@operational/components"

export const title = "Tables"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/tabs.md"

export const Component = () => (
  <React.Fragment>
    <Tabs>
      <Tab title="Tab 1">Content 1</Tab>
      <Tab title="Tab 2">Content 2</Tab>
      <Tab title="Tab 3">Content 3</Tab>
    </Tabs>
  </React.Fragment>
)
