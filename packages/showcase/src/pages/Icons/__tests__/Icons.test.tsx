import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessIcons from "../Icons"

const Icons = wrapTheme(contiamoTheme)(ThemelessIcons)

describe("Icons Page", () => {
  it("Should render correctly", () => {
    expect(render(<Icons />)).toMatchSnapshot()
  })
})
