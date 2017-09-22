import * as React from "react"
import { render } from "enzyme"

import ThemelessInfoTile from "../InfoTile"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const InfoTile = wrapDefaultTheme(ThemelessInfoTile)

describe("InfoTile", () => {
  it("Should render", () => {
    const renderedComponent = render(<InfoTile label="Country">DE</InfoTile>)
    expect(renderedComponent).toMatchSnapshot()
  })
})
