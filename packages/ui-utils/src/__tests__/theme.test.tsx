import * as React from "react"
import { render, configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import { wrapTheme } from "../theme"

configure({ adapter: new Adapter() })

const ThemelessComp = () => <div>Hello, ThemeWrapper!</div>

const Comp = wrapTheme({})(ThemelessComp)

describe("Progress Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Comp />)).toMatchSnapshot()
  })
})
