import * as React from "react"
import { shallow } from "enzyme"

import { SideNavigationHeader } from "../SideNavigationHeader"

describe("SideNavigationHeader", () => {
  it("Should render correctly", () =>
    expect(shallow(<SideNavigationHeader>hi</SideNavigationHeader>)).toMatchSnapshot())
})
