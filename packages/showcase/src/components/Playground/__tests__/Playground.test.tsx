import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessPlayground from "../Playground"

const Playground = wrapTheme(contiamoTheme)(ThemelessPlayground)

describe("Playground Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Playground snippet="">hi</Playground>)).toMatchSnapshot()
  })
})
