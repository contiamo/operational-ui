import * as React from "react"
import { shallow } from "enzyme"

import { wrapTheme } from "@contiamo/ui-utils"
import { contiamoTheme } from "@contiamo/ui"
import ThemelessSideNavigation from "../SideNavigation"

const SideNavigation = wrapTheme(contiamoTheme)(ThemelessSideNavigation)

describe("App Showcase: SideNavigation", () => {
  it("Should render correctly", () => {
    expect(shallow(<SideNavigation />)).toMatchSnapshot()
  })
})
