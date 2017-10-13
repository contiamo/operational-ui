import * as React from "react"
import { render } from "enzyme"

import ThemelessPlusChip from "../PlusChip"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const PlusChip = wrapDefaultTheme(ThemelessPlusChip)

describe("Plus Chip", () => {
  it("Should correctly render", () => {
    expect(render(<PlusChip />)).toMatchSnapshot()
  })
})
