import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessTooltipsPage from "../Tooltips"

const TooltipsPage = wrapDefaultTheme(ThemelessTooltipsPage)

describe("Tooltips Page", () => {
  it("Should render correctly", () => {
    expect(render(<TooltipsPage />)).toMatchSnapshot()
  })
})
