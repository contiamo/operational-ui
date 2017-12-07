import * as React from "react"
import { render } from "enzyme"
import { wrapTheme } from "@operational/utils"
import { contiamoTheme } from "@operational/theme"

import ThemelessMarathon from "../Marathon"

const Marathon = wrapTheme(contiamoTheme)(ThemelessMarathon)

describe("Marathon Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Marathon />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
