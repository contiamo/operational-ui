import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessBreakdown from "../Breakdown"

const Breakdown = wrapTheme(contiamoTheme)(ThemelessBreakdown)

describe("Breakdown Page", () => {
  it("Should render correctly", () => {
    expect(render(<Breakdown />)).toMatchSnapshot()
  })
})
