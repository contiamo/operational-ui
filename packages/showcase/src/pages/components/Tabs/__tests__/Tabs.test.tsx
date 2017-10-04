import * as React from "react"
import { render } from "enzyme"
import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"

import ThemelessTabsPage from "../Tabs"

const TabsPage = wrapTheme(contiamoTheme)(ThemelessTabsPage)

describe("Tabs Page", () => {
  it("Should render correctly", () => {
    expect(render(<TabsPage />)).toMatchSnapshot()
  })
})
