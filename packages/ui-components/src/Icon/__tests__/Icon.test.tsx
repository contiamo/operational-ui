import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../utils/wrap-default-theme"
import ThemelessIcon from "../Icon"

const Icon = wrapDefaultTheme(ThemelessIcon)

describe("Icon Component", () => {
  it("Renders an <svg> tag", () => {
    expect(render(<Icon name="play" />)).toMatchSnapshot()
  })
})
