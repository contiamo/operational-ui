import * as React from "react"
import { ContextMenu, ContextMenuItem, Card, CardHeader, Icon } from "@operational/components"

import { Layout, Props, Playground, StaticContent } from "../../components"

const simpleSnippet = `
<ContextMenu>
  <Icon name="MoreHorizontal" size={16} />
  <ContextMenuItem
    onClick={() => {
      console.log("clicked")
    }}
  >
    Menu 1
  </ContextMenuItem>
  <ContextMenuItem>Menu 2</ContextMenuItem>
  <ContextMenuItem>Menu 3</ContextMenuItem>
</ContextMenu>
`

const propDescription = {
  contextMenu: [
    {
      name: "open",
      description: "Specify whether the menu items are visible. Overrides internal open state that triggers on click.",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "onClick",
      description: "Handles click events anywhere *inside* the context menu container, including menu items.",
      defaultValue: "",
      type: "() => void",
      optional: true
    },
    {
      name: "onOutsideClick",
      description: "Handles click events anywhere *outside* the context menu container, including menu items.",
      defaultValue: "",
      type: "() => void",
      optional: true
    },
    {
      name: "keepOpenOnItemClick",
      description: "Suppresses the default behavior of closing the context menu when one of its items is clicked.",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "menuCss",
      description: "Styling overrides for the menu's container",
      defaultValue: "null",
      type: "object",
      optional: true
    }
  ],
  contextMenuItem: [
    {
      name: "onClick",
      description: "Click handler.",
      defaultValue: "-",
      type: "() => void",
      optional: true
    }
  ]
}

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Context menus are nested menus that can expand from anywhere on a page. Their use is encouraged in the header
        and in the upper right corner of cards.
      </p>

      <h2>Usage</h2>
      <Playground snippet={simpleSnippet} scope={{ Icon, ContextMenuItem }} components={{ ContextMenu }} />

      <h2>ContextMenu Props</h2>
      <Table props={propDescription.contextMenu} />

      <h2>ContextMenuItem Props</h2>
      <Table props={propDescription.contextMenuItem} />
    </Card>
  </Layout>
)
