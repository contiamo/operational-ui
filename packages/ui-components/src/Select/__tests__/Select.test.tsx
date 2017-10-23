import * as React from "react"
import { render } from "enzyme"

import ThemelessSelect from "../Select"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Select = wrapDefaultTheme(ThemelessSelect)

const options: [Option] = [
  { label: "John", value: -10 },
  { label: "Joey", value: "Nein" },
  { label: "Tupac", value: true },
  { label: "Chandler", value: [{ alive: true }] }
]

describe("Select", () => {
  it("Should render correctly", () => {
    expect(render(<Select options={options} disabled filterable multiple placeholder="Select me" />)).toMatchSnapshot()
  })
})
