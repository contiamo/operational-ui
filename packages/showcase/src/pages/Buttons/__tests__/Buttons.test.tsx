import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessButtonsPage from "../Buttons"

const ButtonsPage = wrapDefaultTheme(ThemelessButtonsPage)

describe("Buttons Page", () => {
  it("Should render correctly", () => {
    expect(render(<ButtonsPage />)).toMatchSnapshot()
  })
})
