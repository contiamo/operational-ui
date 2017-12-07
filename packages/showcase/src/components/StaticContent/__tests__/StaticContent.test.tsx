import * as React from "react"
import { render } from "enzyme"
import { wrapTheme } from "@operational/utils"
import { contiamoTheme } from "@operational/theme"

import ThemelessStaticContent from "../StaticContent"

const StaticContent = wrapTheme(contiamoTheme)(ThemelessStaticContent)

describe("App Showcase: StaticContent", () => {
  it("Should render correctly", () => {
    expect(render(<StaticContent markdownContent="## Hello" />)).toMatchSnapshot()
  })
})
