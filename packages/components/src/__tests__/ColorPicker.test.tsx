import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../utils/wrap-default-theme"
import { ColorPicker as ThemelessColorPicker } from "../index"

const ColorPicker = wrapDefaultTheme(ThemelessColorPicker)

describe("ColorPicker", () => {
  it("Should initialize properly", () => {
    expect(render(<ColorPicker />)).toMatchSnapshot()
  })
})
