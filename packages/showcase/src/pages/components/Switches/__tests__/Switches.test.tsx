import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessSwitches from "../Switches"

const Switches = wrapTheme(contiamoTheme)(ThemelessSwitches)

describe("Switches Page", () => {
  it("Should render correctly", () => {
    expect(render(<Switches />)).toMatchSnapshot()
  })
})
