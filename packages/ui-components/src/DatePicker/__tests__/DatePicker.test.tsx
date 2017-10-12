import * as React from "react"
import { render } from "enzyme"

import ThemelessDatePicker from "../DatePicker"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const DatePicker = wrapDefaultTheme(ThemelessDatePicker)

describe("DatePicker Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<DatePicker date="2015-11-05" />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
