import * as React from "react"
import { render } from "enzyme"

import { Fieldset as ThemelessFieldset } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Fieldset = wrapDefaultTheme(ThemelessFieldset)

describe("Fieldset Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Fieldset value="SomeValue" />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
