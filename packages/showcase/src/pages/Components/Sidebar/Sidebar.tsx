import * as React from "react"
import { Link } from "react-router-dom"
import { Sidebar, SidebarItem, SidebarLink, Card, CardHeader, Heading2Type } from "@operational/components"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
import * as simpleSnippet from "./snippets/Sidebar.simple.snippet"
import propDescription from "./propDescription"

export const fetch = (text: any) => new Promise(resolve => setTimeout(() => resolve(text), 2000))

export default () => (
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
    <Playground snippet={String(simpleSnippet)} components={{ Sidebar, SidebarItem, SidebarLink }} scope={{ fetch }} />

    <div style={{ marginBottom: 32 }} />

    <CardHeader id="sidebar-item">SidebarItem</CardHeader>
    <Heading2Type>An expandable group of SidebarLinks, with added asynchronous functionality.</Heading2Type>

    <Table props={propDescription.sidebarItem} />
    <p style={{ marginTop: 16, marginBottom: 32 }}>
      <strong>
        Note: This component is wrapped with <Link to="/tooltips">withTooltip</Link> and thus exposes all of the props
        that such components do.
      </strong>
    </p>

    <CardHeader id="sidebar-link">SidebarLink</CardHeader>
    <p>A link, but with onClick instead of href.</p>

    <Table props={propDescription.sidebarLink} />
    <p style={{ marginTop: 16, marginBottom: 32 }}>
      <strong>
        Note: This component is wrapped with <Link to="/tooltips">withTooltip</Link> and thus exposes all of the props
        that such components do.
      </strong>
    </p>
  </Card>
)
