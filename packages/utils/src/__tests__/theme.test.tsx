import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "../index"

const ThemelessComp = () => <div>Hello, ThemeWrapper!</div>

const Comp = wrapTheme({})(ThemelessComp)

xdescribe("Progress Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Comp />)).toMatchSnapshot()
  })
})
