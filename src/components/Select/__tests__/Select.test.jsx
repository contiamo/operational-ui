import React from "react"
import { shallow } from "enzyme"

import { Select } from "../Select"

describe("Select", () => {
  it("Should render correctly", () =>
    expect(shallow(<Select />)).toMatchSnapshot())
})
