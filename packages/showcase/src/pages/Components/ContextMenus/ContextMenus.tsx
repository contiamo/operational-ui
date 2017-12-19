import * as React from "react"
import { ContextMenu, ContextMenuItem, Card, CardHeader, Icon, Heading2Type } from "@operational/components"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import * as simpleSnippet from "./snippets/ContextMenus.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>ContextMenus</CardHeader>

    <p>
      Context menus are nested menus that can expand from anywhere on a page. Their use is encouraged in the header and
      in the upper right corner of cards.
    </p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} scope={{ Icon, ContextMenuItem }} components={{ ContextMenu }} />

    <Heading2Type>ContextMenu Props</Heading2Type>
    <Table props={propDescription.contextMenu} />

    <Heading2Type>ContextMenuItem Props</Heading2Type>
    <Table props={propDescription.contextMenuItem} />
  </Card>
)
