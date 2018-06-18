import * as React from "react"
import { render } from "enzyme"
import { Progress as ThemelessProgress } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Progress = wrapDefaultTheme(ThemelessProgress)

describe("Progress Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Progress />)).toMatchSnapshot()
  })
})
