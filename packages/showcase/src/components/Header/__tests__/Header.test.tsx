import * as React from "react"
import { shallow } from "enzyme"

import { wrapTheme } from "@contiamo/ui-utils"
import { contiamoTheme } from "@contiamo/ui"
import ThemelessHeader from "../Header"

const Header = wrapTheme(contiamoTheme)(ThemelessHeader)

describe("App Showcase: Header", () => {
  it("Should render correctly", () => {
    expect(shallow(<Header />)).toMatchSnapshot()
  })
})
