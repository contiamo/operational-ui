import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessChips from "../Chips"

const Chips = wrapTheme(contiamoTheme)(ThemelessChips)

describe("Cards Page", () => {
  it("Should render correctly", () => {
    expect(render(<Chips />)).toMatchSnapshot()
  })
})
