
import * as React from "react"
import { shallow } from "enzyme"

import SideNavigation from "../SideNavigation"

test("SideNavigation component renders", () => {
  expect(shallow(<SideNavigation />)).toMatchSnapshot()
})
