import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "@contiamo/ui-utils"
import { contiamoTheme } from "@contiamo/ui"
import ThemelessButtons from "../Buttons"

const Buttons = wrapTheme(contiamoTheme)(ThemelessButtons)

describe("Buttons Page", () => {
  it("Should render correctly", () => {
    expect(render(<Buttons />)).toMatchSnapshot()
  })
})
