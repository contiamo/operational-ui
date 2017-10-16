import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessSpinners from "../Spinners"

const Spinners = wrapTheme(contiamoTheme)(ThemelessSpinners)

describe("Spinners Showcase Page", () => {
  it("Should render correctly", () => {
    expect(render(<Spinners />)).toMatchSnapshot()
  })
})
