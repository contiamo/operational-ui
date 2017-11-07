import * as React from "react"
import { ContextMenu, ContextMenuItem, Icon } from "contiamo-ui-components"

export default (() => {
  return (
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
  )
})()
