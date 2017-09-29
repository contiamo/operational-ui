import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "@contiamo/ui-utils"
import { contiamoTheme } from "@contiamo/ui"
import ThemelessCards from "../Cards"

const Cards = wrapTheme(contiamoTheme)(ThemelessCards)

describe("Cards Page", () => {
  it("Should render correctly", () => {
    expect(render(<Cards />)).toMatchSnapshot()
  })
})
