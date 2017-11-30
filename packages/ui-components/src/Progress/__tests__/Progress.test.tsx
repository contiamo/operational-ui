import * as React from "react"
import { render } from "enzyme"

import ThemelessProgress from "../Progress"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Progress = wrapDefaultTheme(ThemelessProgress)

describe("Progress Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Progress />)).toMatchSnapshot()
  })
})
