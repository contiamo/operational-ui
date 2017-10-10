import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessGrids from "../Grids"

const Grids = wrapTheme(contiamoTheme)(ThemelessGrids)

describe("Grids Showcase Page", () => {
  it("Should render correctly", () => {
    expect(render(<Grids />)).toMatchSnapshot()
  })
})
