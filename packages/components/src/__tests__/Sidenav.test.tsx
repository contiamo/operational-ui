import * as React from "react"
import { shallow } from "enzyme"
import wrapDefaultTheme from "../utils/wrap-default-theme"
import { Sidenav as ThemelessSidenav } from "../index"
const Sidenav = wrapDefaultTheme(ThemelessSidenav)
test("Sidenav component renders", () => {
  expect(shallow(<Sidenav />)).toMatchSnapshot()
})
