import { render } from "enzyme"
import * as React from "react"
import { Chip as ThemelessChip } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Chip = wrapDefaultTheme(ThemelessChip)

describe("Chip", () => {
  it("Should render", () => {
    expect(render(<Chip>Hi</Chip>)).toMatchSnapshot()
  })
})
