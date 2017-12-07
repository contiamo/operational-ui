import * as React from "react"
import { render } from "enzyme"

import ThemelessFieldset from "../Fieldset"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Fieldset = wrapDefaultTheme(ThemelessFieldset)

describe("Fieldset Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Fieldset value="SomeValue" />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
