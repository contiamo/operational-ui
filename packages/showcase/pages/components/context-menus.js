import { ContextMenu, ContextMenuItem, Card, CardHeader, Icon, Heading2Type } from "@operational/components"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

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
      name: "openOnHover",
      description: "Specifies whether the context menu should open on hover.",
      defaultValue: "false",
      type: "boolean",
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

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={simpleSnippet} scope={{ Icon, ContextMenuItem }} components={{ ContextMenu }} />

      <Heading2Type>ContextMenu Props</Heading2Type>
      <Table props={propDescription.contextMenu} />

      <Heading2Type>ContextMenuItem Props</Heading2Type>
      <Table props={propDescription.contextMenuItem} />
    </Card>
  </Layout>
)
