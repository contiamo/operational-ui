import * as React from "react"
import { render } from "enzyme"

import ThemelessSelect, { Option } from "../Select"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Select = wrapDefaultTheme(ThemelessSelect)

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
