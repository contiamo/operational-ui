import * as React from "react"
import { render } from "enzyme"

import ThemelessColors from "../Colors"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Colors = wrapDefaultTheme(ThemelessColors)

describe("Tooltips Page", () => {
  it("Should render correctly", () => {
    expect(render(<Colors />)).toMatchSnapshot()
  })
})
