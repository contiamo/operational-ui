import * as React from "react"
import { render } from "enzyme"
import { wrapTheme } from "@operational/utils"
import { operational } from "@operational/theme"

import ThemelessCanvas from "../Canvas"

const Canvas = wrapTheme(operational)(ThemelessCanvas)

describe("App Showcase: Canvas", () => {
  it("Should render correctly", () => {
    expect(render(<Canvas>hi</Canvas>)).toMatchSnapshot()
  })
})
