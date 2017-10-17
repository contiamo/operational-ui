import * as React from "react"
import { render } from "enzyme"

import ThemelessMarathon from "../Marathon"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Marathon = wrapDefaultTheme(ThemelessMarathon)

describe("Marathon Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Marathon />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
