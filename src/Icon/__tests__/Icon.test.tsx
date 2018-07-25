import { render } from "enzyme"
import * as React from "react"
import { Icon as ThemelessIcon } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Icon = wrapDefaultTheme(ThemelessIcon)

describe("Icon Component", () => {
  it("Renders an <svg> tag", () => {
    expect(render(<Icon name="Add" />)).toMatchSnapshot()
  })
})
