import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessCanvas from "../Canvas"

const Canvas = wrapDefaultTheme(ThemelessCanvas)

describe("App Showcase: Canvas", () => {
  it("Should render correctly", () => {
    expect(render(<Canvas>hi</Canvas>)).toMatchSnapshot()
  })
})
