import * as React from "react"
import { render } from "enzyme"
import { Grid as ThemelessGrid } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Grid = wrapDefaultTheme(ThemelessGrid)

describe("Grid Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Grid />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
