import * as React from "react"
import { mount, render } from "enzyme"
import { contiamoTheme } from "contiamo-ui-components"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessColorPickerPage from "../ColorPicker"

const ColorPickerPage = wrapDefaultTheme(ThemelessColorPickerPage)

describe("ColorPickerPage", () => {
  it("Should render correctly", () => {
    expect(render(<ColorPickerPage />)).toMatchSnapshot()
  })
})
