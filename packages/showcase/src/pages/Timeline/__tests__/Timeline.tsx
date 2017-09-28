import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessTimelinePage from "../Timeline"

const TimelinePage = wrapDefaultTheme(ThemelessTimelinePage)

describe("Timeline Page", () => {
  it("Should render correctly", () => {
    expect(render(<TimelinePage />)).toMatchSnapshot()
  })
})
