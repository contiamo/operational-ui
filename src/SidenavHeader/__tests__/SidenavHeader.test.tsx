import * as React from "react"

import { render, shallow } from "enzyme"
import { SidenavHeader as ThemelessSideNavHeader } from "../../"

import wrapDefaultTheme from "../../utils/wrap-default-theme"

const SidenavHeader = wrapDefaultTheme(ThemelessSideNavHeader)

describe("SidenavHeader Component", () => {
  it("Should initialize properly", () => {
    expect(render(<SidenavHeader label="Chapter One" to="/one" />)).toMatchSnapshot()
  })

  it("Expect to have a valid wrapper after loaded", () => {
    const wrapper = shallow(<SidenavHeader label="Chapter One" to="/one" />)
    expect(wrapper).toBeTruthy()
  })
})
