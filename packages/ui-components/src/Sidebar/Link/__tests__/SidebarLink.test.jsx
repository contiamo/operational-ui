// @flow
import React from "react"
import { shallow } from "enzyme"

import { SidebarLink, style } from "../SidebarLink"
import theme from "../../../theme"

describe("SidebarLink", () => {
  it("Should render correctly", () => {
    const renderedComponent = shallow(<SidebarLink className="hi">sup</SidebarLink>)
    expect(renderedComponent).toMatchSnapshot()
  })
  it("Should render a react-router link if given a `to` prop", () => {
    const renderedComponent = shallow(
      <SidebarLink className="hi" to="/route">
        sup
      </SidebarLink>
    )
    expect(renderedComponent).toMatchSnapshot()
  })
  it("Should receive proper styles", () => {
    expect(style({ theme })).toMatchObject({})
  })
  it("Should display a symbol to the right", () => {
    const renderedComponent = shallow(
      <SidebarLink className="hi" symbol="% s  ">
        sup
      </SidebarLink>
    )
    expect(renderedComponent).toMatchSnapshot()
  })
})
