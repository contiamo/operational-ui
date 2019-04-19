import * as React from "react"

import { render } from "enzyme"
import { SidenavItem as ThemelessSidenavItem } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const SidenavItem = wrapDefaultTheme(ThemelessSidenavItem)

describe("SidenavItem Component", () => {
  it("Should initialize properly", () => {
    expect(render(<SidenavItem label="My Account" icon="User" />)).toMatchSnapshot()
  })
})
