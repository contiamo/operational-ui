import * as React from "react"
import { render } from "enzyme"
import { BrowserRouter as Router } from "react-router-dom"

import ThemelessIntroPage from "../Intro"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const IntroPage = wrapDefaultTheme(ThemelessIntroPage)

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
