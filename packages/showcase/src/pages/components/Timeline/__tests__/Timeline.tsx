import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessTimelinePage from "../Timeline"

const TimelinePage = wrapTheme(contiamoTheme)(ThemelessTimelinePage)

describe("Timeline Page", () => {
  it("Should render correctly", () => {
    expect(render(<TimelinePage />)).toMatchSnapshot()
  })
})
