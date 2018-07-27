import { render } from "enzyme"
import * as React from "react"
import { Grid as ThemelessGrid } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Grid = wrapDefaultTheme(ThemelessGrid)

describe("Grid Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Grid type="2x3" />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
