import { render } from "enzyme"
import * as React from "react"
import { Progress as ThemelessProgress } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Progress = wrapDefaultTheme(ThemelessProgress)

describe("Progress Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Progress />)).toMatchSnapshot()
  })
})
