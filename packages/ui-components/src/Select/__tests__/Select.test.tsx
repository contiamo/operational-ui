import * as React from "react"
import { render } from "enzyme"

import { Select, Option } from "../Select"
import style from "../Select.style"

const options: [Option] = [
  { id: 1, label: "John", value: -10 },
  { id: 2, label: "Joey", value: "Nein" },
  { id: 3, label: "Tupac", value: true },
  { id: 4, label: "Chandler", value: [{ alive: true }] }
]

describe("Select", () => {
  it("Should render correctly", () => {
    expect(render(<Select options={options} disabled filterable multiple placeholder="Select me" />)).toMatchSnapshot()
  })
})
