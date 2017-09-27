import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessCanvas from "../Canvas"

const Canvas = wrapTheme(contiamoTheme)(ThemelessCanvas)

describe("App Showcase: Canvas", () => {
  it("Should render correctly", () => {
    expect(render(<Canvas>hi</Canvas>)).toMatchSnapshot()
  })
})
