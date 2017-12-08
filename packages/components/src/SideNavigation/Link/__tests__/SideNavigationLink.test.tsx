import * as React from "react"
import { shallow } from "enzyme"
import theme from "@operational/theme"

import { SideNavigationLink, style } from "../SideNavigationLink"

describe("SideNavigationLink", () => {
  it("Should render", () => {
    const renderedComponent = shallow(<SideNavigationLink className="hi">Hi, I'm a Link</SideNavigationLink>)
    expect(renderedComponent).toMatchSnapshot()
  })
})
