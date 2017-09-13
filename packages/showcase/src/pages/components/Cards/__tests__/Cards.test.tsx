import * as React from "react"
import { render } from "enzyme"

import CardsPage from "../Cards"

describe("Cards Page", () => {
  it("Should render correctly", () => {
    expect(render(<CardsPage />)).toMatchSnapshot()
  })
})
