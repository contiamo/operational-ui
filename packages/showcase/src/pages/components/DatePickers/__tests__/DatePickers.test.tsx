import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessDatePickers from "../DatePickers"

const DatePickers = wrapTheme(contiamoTheme)(ThemelessDatePickers)

describe("DatePickers Showcase Page", () => {
  it("Should render correctly", () => {
    expect(render(<DatePickers />)).toMatchSnapshot()
  })
})
