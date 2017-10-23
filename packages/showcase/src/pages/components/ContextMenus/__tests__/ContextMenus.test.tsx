import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessContextMenus from "../ContextMenus"

const ContextMenus = wrapTheme(contiamoTheme)(ThemelessContextMenus)

describe("ContextMenus Showcase Page", () => {
  it("Should render correctly", () => {
    expect(render(<ContextMenus />)).toMatchSnapshot()
  })
})
