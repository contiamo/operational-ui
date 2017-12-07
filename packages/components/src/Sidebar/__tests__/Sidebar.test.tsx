import * as React from "react"
import { shallow } from "enzyme"

import { Sidebar } from "../Sidebar"

describe("Sidebar", () => {
  it("Should render and initialize properly", () => {
    const renderedComponent = shallow(<Sidebar />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
