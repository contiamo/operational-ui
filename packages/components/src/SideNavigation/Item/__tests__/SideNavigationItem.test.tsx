import * as React from "react"
import { render } from "enzyme"

import ThemelessSideNavigationItem from "../SideNavigationItem"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const SideNavigationItem = wrapDefaultTheme(ThemelessSideNavigationItem)

test("SideNavigationItem component renders", () => {
  const output = render(<SideNavigationItem>Hi, I'm an Item</SideNavigationItem>)
  expect(output).toMatchSnapshot()
})
