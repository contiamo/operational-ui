import * as React from "react"
import { render } from "enzyme"

import { PlusChip } from "../PlusChip"

describe("Plus Chip", () => {
  it("Should correctly render", () => {
    expect(render(<PlusChip />)).toMatchSnapshot()
  })
})
