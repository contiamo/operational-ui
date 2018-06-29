import * as React from "react"
import { render } from "enzyme"
import { ContextMenu as ThemelessContextMenu, Icon, ContextMenuItem } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const ContextMenu = wrapDefaultTheme(ThemelessContextMenu)

describe("ContextMenu Component", () => {
  it("Should render", () => {
    const renderedComponent = render(
      <ContextMenu>
        <Icon name="Document" size={16} />
        <ContextMenuItem onClick={() => alert("clicked")}>Menu 1</ContextMenuItem>
        <ContextMenuItem>Menu 2</ContextMenuItem>
        <ContextMenuItem>Menu 3</ContextMenuItem>
      </ContextMenu>,
    )
    expect(renderedComponent).toMatchSnapshot()
  })
})
