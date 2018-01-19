import * as React from "react"
import { Sidebar, SidebarItem, SidebarHeader, Card, CardHeader } from "@operational/components"

import Playground from "../../components/Playground"
import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"

const simpleSnippet = `
<Sidebar>
  <SidebarHeader label="Links">
    <SidebarItem onClick={() => window.open("https://www.contiamo.com")}>Link 1</SidebarItem>
    <SidebarItem>Link 2</SidebarItem>
  </SidebarHeader>
  <SidebarHeader label="Links 2">
    <SidebarItem>Link 3</SidebarItem>
    <SidebarItem>Link 4</SidebarItem>
  </SidebarHeader>
</Sidebar>
`

const propDescription = {
  sidebarHeader: [
    {
      name: "label",
      description: "The label of the SidebarItem.",
      defaultValue: "",
      type: "string",
      optional: false
    },
    {
      name: "open",
      description: "Is the item open or closed by default?",
      defaultValue: "false",
      type: "boolean",
      optional: false
    },
    {
      name: "onClick",
      description:
        "A function to pass to the item that executes before the item expands. If a function returning a Promise is passed in, the item only expands after the Promise resolves.",
      defaultValue: <pre>() => this.open = !this.open</pre>,
      type: "func",
      optional: true
    }
  ],
  sidebarItem: [
    {
      name: "onClick",
      description:
        "A function called on click of this component, to be used instead of the `to` prop to do more than just navigate.",
      defaultValue: "",
      type: "func",
      optional: true
    }
  ]
}

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        The sidebar is a dynamic list-style navigational element to be used in cases with a large number of list-style
        actionable items. This component involves composition of two types of elements, headers and items.
      </p>

      <h2>Usage</h2>
      <Playground snippet={simpleSnippet} components={{ Sidebar, SidebarHeader, SidebarItem }} />

      <h2>SidebarHeader</h2>

      <p>An expandable group of SidebarItems.</p>

      <Table props={propDescription.sidebarHeader} />

      <h2>SidebarItem</h2>
      <p>A single item</p>

      <Table props={propDescription.sidebarItem} />
    </Card>
  </Layout>
)
