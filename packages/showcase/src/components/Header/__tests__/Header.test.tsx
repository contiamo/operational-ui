import * as React from "react"
import { shallow } from "enzyme"
import { wrapTheme } from "@operational/utils"
import { contiamoTheme } from "@operational/theme"

import ThemelessHeader from "../Header"

const Header = wrapTheme(contiamoTheme)(ThemelessHeader)

describe("App Showcase: Header", () => {
  it("Should render correctly", () => {
    expect(shallow(<Header />)).toMatchSnapshot()
  })
})
