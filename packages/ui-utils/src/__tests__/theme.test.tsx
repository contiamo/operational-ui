import * as React from "react"
import { render, configure } from "enzyme"

import { wrapTheme } from "../theme"

const ThemelessComp = () => <div>Hello, ThemeWrapper!</div>

const Comp = wrapTheme({})(ThemelessComp)

describe("Progress Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Comp />)).toMatchSnapshot()
  })
})
