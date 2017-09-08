import * as React from "react"
import { render } from "enzyme"

import ButtonsPage from "../Buttons"

describe("Buttons Page", () => {
  it("Should render correctly", () => {
    expect(render(<ButtonsPage />)).toMatchSnapshot()
  })
})
