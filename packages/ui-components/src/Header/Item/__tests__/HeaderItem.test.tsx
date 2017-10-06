import * as React from "react"
import { render } from "enzyme"

import { HeaderItem } from "../HeaderItem"

describe("HeaderItem", () => {
  it("Renders", () => {
    const output = render(<HeaderItem>My name is Ed</HeaderItem>)
    expect(output).toMatchSnapshot()
  })
})
