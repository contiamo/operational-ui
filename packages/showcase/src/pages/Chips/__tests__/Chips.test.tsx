import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessChipsPage from "../Chips"

const ChipsPage = wrapDefaultTheme(ThemelessChipsPage)

describe("Cards Page", () => {
  it("Should render correctly", () => {
    expect(render(<ChipsPage />)).toMatchSnapshot()
  })
})
