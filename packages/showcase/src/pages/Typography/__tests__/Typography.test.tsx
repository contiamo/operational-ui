import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "@contiamo/ui-utils"
import { contiamoTheme } from "@contiamo/ui"
import ThemelessTypography from "../Typography"

const Typography = wrapTheme(contiamoTheme)(ThemelessTypography)

describe("Tooltips Page", () => {
  it("Should render correctly", () => {
    expect(render(<Typography />)).toMatchSnapshot()
  })
})
