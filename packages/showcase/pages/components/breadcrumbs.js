import * as React from "react"
import {
  Breadcrumb,
  Breadcrumbs,
  ContextMenu,
  ContextMenuItem,
  Card,
  CardHeader,
  Heading2Type
} from "@operational/components"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const simpleSnippet = `
<Breadcrumbs>
  <a href="http://home.com"><Breadcrumb>Home</Breadcrumb></a>
  <Breadcrumb>Page 1</Breadcrumb>
  <Breadcrumb>Subpage 1</Breadcrumb>
</Breadcrumbs>
`

const snippetWithContextMenu = `
<Breadcrumbs>
  <ContextMenu css={{display: "inline-block", margin: 0}} menuCss={{ top: "calc(100% + 6px)"}}>
    <Breadcrumb icon="ChevronDown">Hello</Breadcrumb>
    <ContextMenuItem>Item 1</ContextMenuItem>
    <ContextMenuItem>Item 2</ContextMenuItem>
    <ContextMenuItem>Item 3</ContextMenuItem>
  </ContextMenu>
  <Breadcrumb>Good Bye</Breadcrumb>
</Breadcrumbs>
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Breadcrumbs are typically a series of links showing the path to a particular page, and linking to each parent.
        Operational UI's breadcrumbs add a few extra functionality, such as icon and context menu support.
      </p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={simpleSnippet} components={{ Breadcrumbs }} scope={{ Breadcrumb }} />

      <Heading2Type>Usage with context menu</Heading2Type>
      <Playground
        snippet={snippetWithContextMenu}
        components={{ Breadcrumbs }}
        scope={{ ContextMenuItem, ContextMenu, Breadcrumb }}
      />

      <Heading2Type>Props</Heading2Type>
      <Table
        props={[
          {
            name: "children",
            description: "Child elements, typically <Breadcrumb>",
            defaultValue: "null",
            type: "ReactElement",
            optional: true
          }
        ]}
      />
    </Card>
  </Layout>
)
