import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessColorPickers from "../ColorPickers"

const ColorPickers = wrapTheme(contiamoTheme)(ThemelessColorPickers)

describe("ColorPickersPage", () => {
  it("Should render correctly", () => {
    expect(render(<ColorPickers />)).toMatchSnapshot()
  })
})
