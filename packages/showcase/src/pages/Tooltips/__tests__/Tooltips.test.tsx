import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessTooltips from "../Tooltips"

const Tooltips = wrapTheme(contiamoTheme)(ThemelessTooltips)

describe("Tooltips Page", () => {
  it("Should render correctly", () => {
    expect(render(<Tooltips />)).toMatchSnapshot()
  })
})
