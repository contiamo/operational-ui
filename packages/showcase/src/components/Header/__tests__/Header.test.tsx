import * as React from "react"
import { shallow } from "enzyme"
import { wrapTheme } from "@operational/utils"
import { operational } from "@operational/theme"

import ThemelessHeader from "../Header"

const Header = wrapTheme(operational)(ThemelessHeader)

describe("App Showcase: Header", () => {
  it("Should render correctly", () => {
    expect(shallow(<Header />)).toMatchSnapshot()
  })
})
