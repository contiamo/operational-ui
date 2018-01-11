import * as React from "react"
import { render } from "enzyme"

import { Checkbox as ThemelessCheckbox } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Checkbox = wrapDefaultTheme(ThemelessCheckbox)

describe("Checkbox", () => {
  it("Should render", () => {
    expect(render(<Checkbox options={["1", "2"]} selected={["1"]} />)).toMatchSnapshot()
  })
})
