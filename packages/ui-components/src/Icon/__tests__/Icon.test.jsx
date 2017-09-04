import React from "react"
import { shallow } from "enzyme"

import { Icon } from "../Icon"

describe("Icon Component", () => {
  it("Renders an <svg> tag", () => {
    expect(shallow(<Icon name="play" />)).toMatchSnapshot()
  })
})
