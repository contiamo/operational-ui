import * as React from "react"
import { render } from "enzyme"

import { Select } from "../Select"
import style from "../Select.style"

import { options } from "../__mocks__/Select.mock"

describe("Select", () => {
  it("Should render correctly", () => {
    expect(render(<Select options={options} disabled filterable multiple placeholder="Select me" />)).toMatchSnapshot()
  })
})
