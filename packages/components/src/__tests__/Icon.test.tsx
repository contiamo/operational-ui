import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../utils/wrap-default-theme"
import { Icon as ThemelessIcon } from "../index"

const Icon = wrapDefaultTheme(ThemelessIcon)

describe("Icon Component", () => {
  it("Renders an <svg> tag", () => {
    expect(render(<Icon name="Play" />)).toMatchSnapshot()
  })
})
