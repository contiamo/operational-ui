import * as React from "react"
import { shallow } from "enzyme"

import { SideNavigationLink, style } from "../SideNavigationLink"
import theme from "contiamo-ui-theme"

describe("SideNavigationLink", () => {
  it("Should render", () => {
    const renderedComponent = shallow(<SideNavigationLink className="hi">Hi, I'm a Link</SideNavigationLink>)
    expect(renderedComponent).toMatchSnapshot()
  })
})
