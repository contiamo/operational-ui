import * as React from "react"
import { ContextMenu, ContextMenuItem } from "@operational/components"

export default () => (
  <React.Fragment>
    <ContextMenu>
      <span>Change me!</span>
      <ContextMenuItem>To this</ContextMenuItem>
      <ContextMenuItem>..this</ContextMenuItem>
      <ContextMenuItem>...or this</ContextMenuItem>
    </ContextMenu>
  </React.Fragment>
)
