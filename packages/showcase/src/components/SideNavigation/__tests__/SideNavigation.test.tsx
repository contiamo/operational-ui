import * as React from "react"
import { shallow } from "enzyme"

import SideNavigation from "../SideNavigation"

describe("App Showcase: SideNavigation", () => {
  it("Should render correctly", () => {
    expect(shallow(<SideNavigation />)).toMatchSnapshot()
  })
})
