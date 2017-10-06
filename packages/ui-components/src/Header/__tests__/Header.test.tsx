import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessHeader from "../Header"

import theme from "../../theme"

const Header = wrapDefaultTheme(ThemelessHeader)

describe("Header", () => {
  it("Header component renders", () => {
    const output = render(<Header className="hi">Hello</Header>)
    expect(output).toMatchSnapshot()
  })
})
