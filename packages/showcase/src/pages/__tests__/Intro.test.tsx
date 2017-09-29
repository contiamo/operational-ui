import * as React from "react"
import { render } from "enzyme"
import { BrowserRouter as Router } from "react-router-dom"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessIntroPage from "../Intro"

const IntroPage = wrapTheme(contiamoTheme)(ThemelessIntroPage)

describe("IntroPage", () => {
  it("Should render correctly", () => {
    expect(
      render(
        <Router>
          <IntroPage />
        </Router>
      )
    ).toMatchSnapshot()
  })
})
