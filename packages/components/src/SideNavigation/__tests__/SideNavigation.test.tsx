import * as React from "react"
import { shallow } from "enzyme"

import wrapDefaultTheme from "../../utils/wrap-default-theme"
import ThemelessSideNavigation from "../SideNavigation"

const SideNavigation = wrapDefaultTheme(ThemelessSideNavigation)

test("SideNavigation component renders", () => {
  expect(shallow(<SideNavigation />)).toMatchSnapshot()
})
