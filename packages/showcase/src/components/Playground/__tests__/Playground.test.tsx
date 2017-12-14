import * as React from "react"
import { render } from "enzyme"
import { wrapTheme } from "@operational/utils"
import { operational } from "@operational/theme"

import ThemelessPlayground from "../Playground"

const Playground = wrapTheme(operational)(ThemelessPlayground)

describe("Playground Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Playground snippet="">hi</Playground>)).toMatchSnapshot()
  })
})
