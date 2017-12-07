import * as React from "react"
import { render } from "enzyme"

import ThemelessInput from "../Input"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Input = wrapDefaultTheme(ThemelessInput)

describe("Input", () => {
  it("Should initialize", () => {
    const input = render(<Input className="hi" value="How are you?" placeholder="hello" name="bienvenue" />)
    expect(input).toMatchSnapshot()
  })
})
