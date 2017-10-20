import * as React from "react"
import { render } from "enzyme"

import ThemelessModal from "../Modal"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Modal = wrapDefaultTheme(ThemelessModal)

describe("Modal Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Modal value="SomeValue" />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
