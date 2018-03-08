import * as React from "react"
import { Breadcrumb, Breadcrumbs, ContextMenu, ContextMenuItem, Card, CardHeader } from "@operational/components"

import { Layout, Props, Playground } from "../../components"

const simpleSnippet = `
<Breadcrumbs>
  <a href="http://home.com"><Breadcrumb>Home</Breadcrumb></a>
  <Breadcrumb>Page 1</Breadcrumb>
  <Breadcrumb>Subpage 1</Breadcrumb>
</Breadcrumbs>
`

const snippetWithContextMenu = `
<Breadcrumbs>
  <ContextMenu css={{display: "inline-block", margin: 0}}>
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
      <CardHeader>Breadcrumbs</CardHeader>

      <p>
        Breadcrumbs are typically a series of links showing the path to a particular page, and linking to each parent.
        Operational UI's breadcrumbs add a few extra functionality, such as icon and context menu support.
      </p>

      <h2>Usage</h2>
      <Playground snippet={simpleSnippet} components={{ Breadcrumbs }} scope={{ Breadcrumb }} />

      <h2>Usage with context menu</h2>
      <Playground
        snippet={snippetWithContextMenu}
        components={{ Breadcrumbs }}
        scope={{ ContextMenuItem, ContextMenu, Breadcrumb }}
      />
    </Card>
    <Card>
      <CardHeader>Examples</CardHeader>
    </Card>
    <Card>
      <CardHeader>Props</CardHeader>
      <Props
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
