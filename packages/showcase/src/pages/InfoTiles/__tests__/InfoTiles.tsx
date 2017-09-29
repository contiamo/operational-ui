import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "@contiamo/ui-utils"
import { contiamoTheme } from "@contiamo/ui"
import ThemelessInfoTiles from "../InfoTiles"

const InfoTiles = wrapTheme(contiamoTheme)(ThemelessInfoTiles)

describe("InfoTiles Page", () => {
  it("Should render correctly", () => {
    expect(render(<InfoTiles />)).toMatchSnapshot()
  })
})
