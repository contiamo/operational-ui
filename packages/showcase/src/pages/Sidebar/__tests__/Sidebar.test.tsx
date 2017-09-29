import * as React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { render } from "enzyme"

import { wrapTheme } from "@contiamo/ui-utils"
import { contiamoTheme } from "@contiamo/ui"
import ThemelessSidebar, { fetch } from "../Sidebar"

const Sidebar = wrapTheme(contiamoTheme)(ThemelessSidebar)

describe("Sidebar Page", () => {
  it("Should render correctly", () => {
    expect(
      render(
        <Router>
          <Sidebar />
        </Router>
      )
    ).toMatchSnapshot()
  })

  it("Should have a proper timeout for the async test", async () => {
    const fetchedVal = await fetch("hi")
    expect(fetchedVal).toBe("hi")
  })
})
