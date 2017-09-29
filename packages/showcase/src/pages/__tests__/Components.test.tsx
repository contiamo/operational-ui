import * as React from "react"
import { render } from "enzyme"
import { BrowserRouter as Router } from "react-router-dom"

import { wrapTheme } from "@contiamo/ui-utils"
import { contiamoTheme } from "@contiamo/ui"
import ThemelessComponentsPage from "../Components"

const ComponentsPage = wrapTheme(contiamoTheme)(ThemelessComponentsPage)

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
