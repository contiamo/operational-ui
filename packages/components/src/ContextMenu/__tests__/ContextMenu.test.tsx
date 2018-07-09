import * as React from "react"
import { render } from "enzyme"
import { ContextMenu as ThemelessContextMenu, Icon } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const ContextMenu = wrapDefaultTheme(ThemelessContextMenu)

describe("ContextMenu Component", () => {
  it("Should render", () => {
    const renderedComponent = render(
      <ContextMenu items={[ "Item 1", "Item 2", "Item 3" ]}>
        <Icon name="Document" size={16} />
      </ContextMenu>,
    )
    expect(renderedComponent).toMatchSnapshot()
  })
})
