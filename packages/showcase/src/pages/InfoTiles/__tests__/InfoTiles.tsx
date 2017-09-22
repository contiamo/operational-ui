import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessInfoTilesPage from "../InfoTiles"

const InfoTilesPage = wrapDefaultTheme(ThemelessInfoTilesPage)

describe("InfoTiles Page", () => {
  it("Should render correctly", () => {
    expect(render(<InfoTilesPage />)).toMatchSnapshot()
  })
})
