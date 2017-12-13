import * as React from "react"
import { shallow } from "enzyme"

import wrapDefaultTheme from "../../utils/wrap-default-theme"
import ThemelessSidenav from "../Sidenav"

const Sidenav = wrapDefaultTheme(ThemelessSidenav)

test("Sidenav component renders", () => {
  expect(shallow(<Sidenav />)).toMatchSnapshot()
})
