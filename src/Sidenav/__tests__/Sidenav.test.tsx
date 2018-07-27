import { shallow } from "enzyme"
import * as React from "react"
import { Sidenav as ThemelessSidenav } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Sidenav = wrapDefaultTheme(ThemelessSidenav)

test("Sidenav component renders", () => {
  expect(shallow(<Sidenav />)).toMatchSnapshot()
})
