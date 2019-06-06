import { render } from "enzyme"
import * as React from "react"
import { ContextMenu as ThemelessContextMenu, DocumentIcon } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const ContextMenu = wrapDefaultTheme(ThemelessContextMenu)

describe("ContextMenu Component", () => {
  it("Should render", () => {
    const renderedComponent = render(
      <ContextMenu items={["Item 1", "Item 2", "Item 3"]}>
        <DocumentIcon size={16} />
      </ContextMenu>,
    )
    expect(renderedComponent).toMatchSnapshot()
  })
})
