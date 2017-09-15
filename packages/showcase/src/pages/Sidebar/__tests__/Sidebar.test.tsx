import * as React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessSidebarPage, { fetch } from "../Sidebar"

const SidebarPage = wrapDefaultTheme(ThemelessSidebarPage)

describe("Sidebar Page", () => {
  it("Should render correctly", () => {
    expect(
      render(
        <Router>
          <SidebarPage />
        </Router>
      )
    ).toMatchSnapshot()
  })

  it("Should have a proper timeout for the async test", async () => {
    const fetchedVal = await fetch("hi")
    expect(fetchedVal).toBe("hi")
  })
})
