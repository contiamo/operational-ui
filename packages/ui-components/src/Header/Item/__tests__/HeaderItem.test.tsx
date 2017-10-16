import * as React from "react"
import { render } from "enzyme"

import ThemelessHeaderItem from "../HeaderItem"
import wrapDefaultTheme from "../../../../utils/wrap-default-theme"

const HeaderItem = wrapDefaultTheme(ThemelessHeaderItem)

describe("HeaderItem", () => {
  it("Renders", () => {
    const output = render(<HeaderItem>My name is Ed</HeaderItem>)
    expect(output).toMatchSnapshot()
  })
})
