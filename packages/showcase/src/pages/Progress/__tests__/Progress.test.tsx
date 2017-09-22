import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessProgressPage from "../Progress"

const ProgressPage = wrapDefaultTheme(ThemelessProgressPage)

describe("Progress Page", () => {
  it("Should render correctly", () => {
    expect(render(<ProgressPage />)).toMatchSnapshot()
  })
})
