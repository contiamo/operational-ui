import * as React from "react"
import { Sidebar, SidebarItem, SidebarLink, Card, CardHeader, Heading2Type } from "@operational/components"

import Playground from "../../components/Playground"
import Layout from "../../components/Layout"
import Canvas from "../../components/Canvas"
import Table from "../../components/PropsTable"

const simpleSnippet = `
<Sidebar>
  <SidebarItem label="Links">
    <SidebarLink onClick={() => window.open("https://www.contiamo.com")} symbol="&rarr;">
      Link 1
    </SidebarLink>
    <SidebarLink>Link 2</SidebarLink>
  </SidebarItem>
  <SidebarItem label="Fetch data first" tooltip="Click for async fun!" onClick={() => fetch("SOME URL")}>
    <SidebarLink color="#eee">This could have been</SidebarLink>
    <SidebarLink color="#777" tooltip="Notice how the text is always readable. 😉">
      fetched from an
    </SidebarLink>
    <SidebarLink>external resource.</SidebarLink>
  </SidebarItem>
</Sidebar>
`

export const fetch = (text: any) => new Promise(resolve => setTimeout(() => resolve(text), 2000))

const propDescription = {
  sidebarItem: [
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
  sidebarLink: [
    {
      name: "to",
      description: "Created to work with react-router, this wraps the children in a <Link> to your route.",
      defaultValue: "",
      type: "string",
      optional: true
    },
    {
      name: "onClick",
      description:
        "A function called on click of this component, to be used instead of the `to` prop to do more than just navigate.",
      defaultValue: "",
      type: "func",
      optional: true
    },
    {
      name: "symbol",
      description:
        "A symbol to display at the right-hand side of the link, such as a `%` sign to suggest a unit of measure.",
      defaultValue: "",
      type: "string",
      optional: true
    },
    {
      name: "color",
      description:
        "Different links can have different colors to communicate different use-cases or purposes. This can be a hex value, or a named color in your theme.",
      defaultValue: "The primary color of your theme.",
      type: "string",
      optional: true
    }
  ]
}

export default props => (
  <Layout pathname={props.url.pathname}>
    <Canvas>
      <Card>
        <CardHeader>Sidebar</CardHeader>

        <p>
          The sidebar is a dynamic list-style navigational element to be used in cases with a large number of list-style
          actionable items. This component involves composition of two constituent elements. Namely,
        </p>
        <ul>
          <li>
            <a href="#sidebar-item">SidebarItem</a>
          </li>
          <li>
            <a href="#sidebar-link">SidebarLink</a>
          </li>
        </ul>

        <div style={{ marginBottom: 32 }} />

        <Heading2Type>Usage</Heading2Type>
        <Playground
          snippet={String(simpleSnippet)}
          components={{ Sidebar, SidebarItem, SidebarLink }}
          scope={{ fetch }}
        />

        <div style={{ marginBottom: 32 }} />

        <CardHeader id="sidebar-item">SidebarItem</CardHeader>
        <Heading2Type>An expandable group of SidebarLinks, with added asynchronous functionality.</Heading2Type>

        <Table props={propDescription.sidebarItem} />

        <CardHeader id="sidebar-link">SidebarLink</CardHeader>
        <p>A link, but with onClick instead of href.</p>

        <Table props={propDescription.sidebarLink} />
      </Card>
    </Canvas>
  </Layout>
)
