import * as React from "react"
import { Sidebar, SidebarItem, SidebarHeader, Card, CardHeader } from "@operational/components"

import Playground from "../../components/Playground"
import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"

const simpleSnippet = `
<Sidebar>
  <SidebarHeader label="Links">
    <SidebarItem onClick={() => {alert("Hello!")}}>Link 1</SidebarItem>
    <SidebarItem>Link 2</SidebarItem>
  </SidebarHeader>
  <SidebarHeader label="Links 2" open>
    <SidebarItem active>Link 3</SidebarItem>
    <SidebarItem>Link 4</SidebarItem>
  </SidebarHeader>
</Sidebar>
`

const statefulSnippet = `
(() => {
class StatefulSidebar extends React.Component {
  state = {
    isOpen: false
  }
  render() {
    return (
      <Sidebar>
        <SidebarHeader
          label="Links"
          open={this.state.isOpen}
          onToggle={() => {
            this.setState(prevState => ({
              isOpen: !prevState.isOpen
            }))
          }}
        >
          <SidebarItem onClick={() => {alert("Hello!")}}>Link 1</SidebarItem>
          <SidebarItem>Link 2</SidebarItem>
        </SidebarHeader>
        <SidebarHeader label="Links 2" open>
          <SidebarHeader label="Links 2 2" open>
            <SidebarItem>Link 3</SidebarItem>
          </SidebarHeader>
          <SidebarItem>Link 4</SidebarItem>
        </SidebarHeader>
      </Sidebar>
    )
  }
}

return <StatefulSidebar/>
})()
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
      name: "onToggle",
      description: "Called when the header's children are expanded or collapsed.",
      defaultValue: "-",
      type: "() => void",
      optional: true
    }
  ],
  sidebarItem: [
    {
      name: "onClick",
      description: "Click handler.",
      defaultValue: "",
      type: "() => void",
      optional: true
    }
  ]
}

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        The sidebar is a dynamic list-style navigational element with a large number of navigational elements and nested
        link structures in mind. This component involves composition of two types of elements, SidebarHeaders and
        SidebarItems, within the container Sidebar component.
      </p>

      <p>
        Both headers and items can be wrapped inside anchor tags or React Router-style links to give them hyperlink
        functionality, which is not included directly into the implementation.
      </p>

      <h2>Usage</h2>
      <p>A simple, purely presentational use looks like this:</p>
      <Playground snippet={simpleSnippet} components={{ Sidebar, SidebarHeader, SidebarItem }} />
      <p>The following snippet shows interactivity and deeper nesting:</p>
      <Playground snippet={statefulSnippet} components={{ Sidebar, SidebarHeader, SidebarItem }} />

      <h2>SidebarHeader</h2>

      <p>
        A header defines an expandable group of SidebarItems, or additional sidebar headers, if a deeper nesting is
        required.
      </p>

      <Table props={propDescription.sidebarHeader} />

      <h2>SidebarItem</h2>
      <p>A sidebar item can be thought of as a leaf node.</p>

      <Table props={propDescription.sidebarItem} />
    </Card>
  </Layout>
)
