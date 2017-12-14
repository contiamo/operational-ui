import * as React from "react"
import { shallow } from "enzyme"
import { wrapTheme } from "@operational/utils"
import { operational } from "@operational/theme"

import ThemelessSidebar from "../Sidebar"

const Sidebar = wrapTheme(operational)(ThemelessSidebar)

describe("App Showcase: Sidebar", () => {
  it("Should render correctly", () => {
    expect(shallow(<Sidebar />)).toMatchSnapshot()
  })
})
