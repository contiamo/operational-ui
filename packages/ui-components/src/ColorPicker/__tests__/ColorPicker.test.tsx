import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessColorPicker from "../ColorPicker"

const ColorPicker = ThemelessColorPicker

describe("ColorPicker", () => {
  it("Should initialize properly", () => {
    expect(render(<ColorPicker />)).toMatchSnapshot()
  })
})
