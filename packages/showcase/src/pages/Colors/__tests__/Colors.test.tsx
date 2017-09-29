import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "@contiamo/ui-utils"
import { contiamoTheme } from "@contiamo/ui"
import ThemelessColors from "../Colors"

const Colors = wrapTheme(contiamoTheme)(ThemelessColors)

describe("Tooltips Page", () => {
  it("Should render correctly", () => {
    expect(render(<Colors />)).toMatchSnapshot()
  })
})
