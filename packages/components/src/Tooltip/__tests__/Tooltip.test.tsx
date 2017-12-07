import * as React from "react"
import { render } from "enzyme"
import { contiamoTheme as theme } from "@operational/theme"

import { Tooltip, style } from "../Tooltip"

describe("Tooltip Component", () => {
  it("Should intialize without problems", () => {
    const output = render(<Tooltip className="test">Hello</Tooltip>)
    expect(output).toMatchSnapshot()
  })
})
