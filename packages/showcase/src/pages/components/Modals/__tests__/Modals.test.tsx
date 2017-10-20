import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessModals from "../Modals"

const Modals = wrapTheme(contiamoTheme)(ThemelessModals)

describe("Modals Showcase Page", () => {
  it("Should render correctly", () => {
    expect(render(<Modals />)).toMatchSnapshot()
  })
})
