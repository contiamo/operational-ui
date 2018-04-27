import * as React from "react"
import { ContextMenu, ContextMenuItem } from "@operational/components"

export const title = "Context Menus"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/context-menu.md"

export const Component = () => (
  <React.Fragment>
    <ContextMenu>
      <span>Change me!</span>
      <ContextMenuItem>To this</ContextMenuItem>
      <ContextMenuItem>..this</ContextMenuItem>
      <ContextMenuItem>...or this</ContextMenuItem>
    </ContextMenu>
  </React.Fragment>
)
