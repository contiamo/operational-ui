import * as React from "react"
import { render } from "enzyme"

import TypographyPage from "../Typography"

describe("Tooltips Page", () => {
  it("Should render correctly", () => {
    expect(render(<TypographyPage />)).toMatchSnapshot()
  })
})
