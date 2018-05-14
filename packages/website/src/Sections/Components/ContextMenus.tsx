import * as React from "react"
import { ContextMenu, ContextMenuItem } from "@operational/components"
import * as constants from "../../constants"

export const title = "Context Menus"

export const docsUrl = `${constants.docsBaseUrl}/components/context-menu.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/ContextMenus.tsx`

export const Component = () => (
  <>
    <ContextMenu>
      <span>Change me!</span>
      <ContextMenuItem>To this</ContextMenuItem>
      <ContextMenuItem>..this</ContextMenuItem>
      <ContextMenuItem>...or this</ContextMenuItem>
    </ContextMenu>
  </>
)
