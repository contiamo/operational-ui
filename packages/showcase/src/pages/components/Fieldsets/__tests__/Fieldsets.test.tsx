import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessFieldsets from "../Fieldsets"

const Fieldsets = wrapTheme(contiamoTheme)(ThemelessFieldsets)

describe("Fieldsets Showcase Page", () => {
  it("Should render correctly", () => {
    expect(render(<Fieldsets />)).toMatchSnapshot()
  })
})
