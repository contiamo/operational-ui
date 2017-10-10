import * as React from "react"
import { render } from "enzyme"

import ThemelessGrid from "../Grid"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Grid = wrapDefaultTheme(ThemelessGrid)

describe("Grid Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Grid value="SomeValue" />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
