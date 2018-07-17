import * as React from "react"
import { render } from "enzyme"
import { Table as ThemelessTable } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Table = wrapDefaultTheme(ThemelessTable)

describe("Table Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Table rows={[]} columns={[]} />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
