import * as React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { render } from "enzyme"

import SidebarPage, { fetch } from "../Sidebar"

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

  it("Should have a proper timeout for the async test", async() => {
    const fetchedVal = await fetch("hi")
    expect(fetchedVal).toBe("hi")
  })
})
