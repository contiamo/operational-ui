import * as React from "react"
import { render } from "enzyme"

import StatsPage from "../Stats"

describe("Cards Page", () => {
  it("Should render correctly", () => {
    expect(render(<StatsPage />)).toMatchSnapshot()
  })
})
