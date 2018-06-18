import * as React from "react"
import { render } from "enzyme"
import { Tooltip as ThemelessTooltip } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Tooltip = wrapDefaultTheme(ThemelessTooltip)

describe("Tooltip Component", () => {
  it("Should intialize without problems", () => {
    const output = render(<Tooltip className="test">Hello</Tooltip>)
    expect(output).toMatchSnapshot()
  })
})
