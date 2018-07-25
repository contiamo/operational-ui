import { render } from "enzyme"
import * as React from "react"
import { Spinner as ThemelessSpinner } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Spinner = wrapDefaultTheme(ThemelessSpinner)

describe("Spinner Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Spinner />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
