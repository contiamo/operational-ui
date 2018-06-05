import * as React from "react"
import { render } from "enzyme"

import { Select as ThemelessSelect } from "../index"
import { IOption } from "../Select/Select"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Select = wrapDefaultTheme(ThemelessSelect)

const options: IOption[] = [
  { label: "John", value: -10 },
  { label: "Joey", value: "Nein" },
  { label: "Tupac", value: "true" },
  { label: "Chandler", value: 10 },
]

describe("Select", () => {
  it("Should render correctly", () => {
    expect(render(<Select options={options} disabled filterable multiple placeholder="Select me" />)).toMatchSnapshot()
  })
})
