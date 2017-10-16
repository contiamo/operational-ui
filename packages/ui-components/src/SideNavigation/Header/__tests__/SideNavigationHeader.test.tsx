import * as React from "react"
import { render } from "enzyme"

import ThemelessSideNavigationHeader from "../SideNavigationHeader"
import wrapDefaultTheme from "../../../../utils/wrap-default-theme"

const SideNavigationHeader = wrapDefaultTheme(ThemelessSideNavigationHeader)

describe("SideNavigationHeader", () => {
  it("Should render correctly", () => expect(render(<SideNavigationHeader>hi</SideNavigationHeader>)).toMatchSnapshot())
})
