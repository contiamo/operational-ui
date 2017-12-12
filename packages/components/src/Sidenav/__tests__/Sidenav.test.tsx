import * as React from "react"
import { shallow } from "enzyme"

import wrapDefaultTheme from "../../utils/wrap-default-theme"
import ThemelessSidenav from "../SideNav"

const SideNav = wrapDefaultTheme(ThemelessSideNav)

test("Sidenav component renders", () => {
  expect(shallow(<Sidenav />)).toMatchSnapshot()
})
