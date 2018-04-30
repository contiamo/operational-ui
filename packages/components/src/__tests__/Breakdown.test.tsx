import * as React from "react"
import { render, mount } from "enzyme"

import { Breakdown as ThemelessBreakdown } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Breakdown = wrapDefaultTheme(ThemelessBreakdown)

describe("Breakdown Component", () => {
  it("Should initialize properly", () => {
    const props = {
      number: 3,
      count: 20,
      percentage: "50%",
    }
    expect(render(<Breakdown {...props}>hi</Breakdown>)).toMatchSnapshot()
  })
})
