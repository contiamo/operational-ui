import * as React from "react"
import { render } from "enzyme"
import { BrowserRouter as Router } from "react-router-dom"

import IntroPage from "../Intro"

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
