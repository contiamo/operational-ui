import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessIconsPage from "../Icons"

const IconsPage = wrapDefaultTheme(ThemelessIconsPage)

describe("Icons Page", () => {
  it("Should render correctly", () => {
    expect(render(<IconsPage />)).toMatchSnapshot()
  })
})
