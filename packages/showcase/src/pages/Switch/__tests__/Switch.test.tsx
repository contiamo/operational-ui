import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessSwitchPage from "../Switch"

const SwitchPage = wrapDefaultTheme(ThemelessSwitchPage)

describe("Cards Page", () => {
  it("Should render correctly", () => {
    expect(render(<SwitchPage />)).toMatchSnapshot()
  })
})
