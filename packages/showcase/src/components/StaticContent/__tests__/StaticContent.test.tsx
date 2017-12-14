import * as React from "react"
import { render } from "enzyme"
import { wrapTheme } from "@operational/utils"
import { operational } from "@operational/theme"

import ThemelessStaticContent from "../StaticContent"

const StaticContent = wrapTheme(operational)(ThemelessStaticContent)

describe("App Showcase: StaticContent", () => {
  it("Should render correctly", () => {
    expect(render(<StaticContent markdownContent="## Hello" />)).toMatchSnapshot()
  })
})
