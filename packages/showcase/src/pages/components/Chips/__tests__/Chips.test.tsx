import * as React from "react"
import { render } from "enzyme"

import ChipsPage from "../Chips"

describe("Cards Page", () => {
  it("Should render correctly", () => {
    expect(render(<ChipsPage />)).toMatchSnapshot()
  })
})
