import * as React from "react"
import { render } from "enzyme"
import { BrowserRouter as Router } from "react-router-dom"

import wrapDefaultTheme from "../../utils/wrap-default-theme"
import ThemelessComponentsPage from "../Components"

const ComponentsPage = wrapDefaultTheme(ThemelessComponentsPage)

describe("ComponentsPage", () => {
  it("Should render correctly", () => {
    expect(
      render(
        <Router>
          <ComponentsPage />
        </Router>
      )
    ).toMatchSnapshot()
  })
})
