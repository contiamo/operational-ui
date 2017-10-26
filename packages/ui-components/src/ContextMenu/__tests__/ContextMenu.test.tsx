import * as React from "react"
import { render } from "enzyme"

import ThemelessContextMenu from "../ContextMenu"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const ContextMenu = wrapDefaultTheme(ThemelessContextMenu)

describe("ContextMenu Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<ContextMenu value="SomeValue" />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
