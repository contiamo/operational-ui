import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { ContextMenu, ContextMenuItem, Card, CardHeader, Icon } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/ContextMenus.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>ContextMenus</CardHeader>

    <p>
      Context menus are nested menus that can expand from anywhere on a page. Their use is encouraged in the header and
      in the upper right corner of cards.
    </p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} scope={{ ContextMenuItem, Icon }} components={{ ContextMenu }} />

    <h4>ContextMenu Props</h4>
    <Table props={propDescription.contextMenu} />

    <h4>ContextMenuItem Props</h4>
    <Table props={propDescription.contextMenuItem} />
  </Card>
)
