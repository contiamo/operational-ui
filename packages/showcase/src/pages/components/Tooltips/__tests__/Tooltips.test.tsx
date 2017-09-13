import * as React from "react"
import { render } from "enzyme"

import TooltipsPage from "../Tooltips"

describe("Tooltips Page", () => {
  it("Should render correctly", () => {
    expect(render(<TooltipsPage />)).toMatchSnapshot()
  })
})
