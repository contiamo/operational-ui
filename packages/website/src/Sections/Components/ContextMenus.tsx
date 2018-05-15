import * as React from "react"
import { ContextMenu, ContextMenuItem, Button } from "@operational/components"
import * as constants from "../../constants"

export const title = "Context Menus"

export const docsUrl = `${constants.docsBaseUrl}/components/context-menu.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/ContextMenus.tsx`

export class Component extends React.Component<{}, { content: string }> {
  state = {
    content: "I am open to change",
  }

  render() {
    return (
      <>
        <ContextMenu>
          <Button>{this.state.content}</Button>
          {["To this content", "Or this content", "Ooor this content"].map(content => (
            <ContextMenuItem
              onClick={() => {
                this.setState(() => ({
                  content,
                }))
              }}
            >
              {content}
            </ContextMenuItem>
          ))}
        </ContextMenu>
      </>
    )
  }
}
