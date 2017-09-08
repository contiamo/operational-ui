import * as React from "react"
import { shallow } from "enzyme"

import Sidebar from "../Sidebar"

describe("App Showcase: Sidebar", () => {
  it("Should render correctly", () => {
    expect(shallow(<Sidebar />)).toMatchSnapshot()
  })
})
