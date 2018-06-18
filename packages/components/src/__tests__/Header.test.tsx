import * as React from "react"
import { render } from "enzyme"
import { operational as theme } from "@operational/theme"
import wrapDefaultTheme from "../utils/wrap-default-theme"
import { Header as ThemelessHeader } from "../index"

const Header = wrapDefaultTheme(ThemelessHeader)

describe("Header", () => {
  it("Header component renders", () => {
    const output = render(<Header>Hello</Header>)
    expect(output).toMatchSnapshot()
  })
})
