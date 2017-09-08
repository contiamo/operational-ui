import * as React from "react"
import { render } from "enzyme"

import IconsPage from "../Icons"

describe("Icons Page", () => {
  it("Should render correctly", () => {
    expect(render(<IconsPage />)).toMatchSnapshot()
  })
})
