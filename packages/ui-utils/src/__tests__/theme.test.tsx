import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "../theme"

const ThemelessComp = () => <div>Hello, ThemeWrapper!</div>

const Comp = wrapTheme({})(ThemelessComp)

xdescribe("Progress Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Comp />)).toMatchSnapshot()
  })
})
