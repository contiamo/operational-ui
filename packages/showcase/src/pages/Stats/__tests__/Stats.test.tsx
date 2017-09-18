import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessStatsPage from "../Stats"

const StatsPage = wrapDefaultTheme(ThemelessStatsPage)

describe("Cards Page", () => {
  it("Should render correctly", () => {
    expect(render(<StatsPage />)).toMatchSnapshot()
  })
})
