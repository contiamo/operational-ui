import * as React from "react"
import { render, configure } from "enzyme"
import * as Adapter from "enzyme-adapter-react-15"

import { wrapTheme } from "../theme"

configure({ adapter: new Adapter() })

const ThemelessComp = () => <div>Hello, ThemeWrapper!</div>

const Comp = wrapTheme({})(ThemelessComp)

console.log(Comp)

describe("Progress Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Comp />)).toMatchSnapshot()
  })
})
