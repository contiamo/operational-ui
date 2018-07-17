import * as React from "react"
import { render } from "enzyme"
import { Switch as ThemelessSwitch } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Switch = wrapDefaultTheme(ThemelessSwitch)

describe("Switch", () => {
  it("Should render", () => {
    expect(render(<Switch on />)).toMatchSnapshot()
  })
})
