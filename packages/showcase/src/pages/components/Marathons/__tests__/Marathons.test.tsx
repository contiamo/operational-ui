import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessMarathons from "../Marathons"

const Marathons = wrapTheme(contiamoTheme)(ThemelessMarathons)

describe("Marathons Showcase Page", () => {
  it("Should render correctly", () => {
    expect(render(<Marathons />)).toMatchSnapshot()
  })
})
