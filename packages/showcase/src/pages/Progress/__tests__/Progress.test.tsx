import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "@contiamo/ui-utils"
import { contiamoTheme } from "@contiamo/ui"
import ThemelessProgress from "../Progress"

const Progress = wrapTheme(contiamoTheme)(ThemelessProgress)

describe("Progress Page", () => {
  it("Should render correctly", () => {
    expect(render(<Progress />)).toMatchSnapshot()
  })
})
