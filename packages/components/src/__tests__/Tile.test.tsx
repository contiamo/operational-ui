import * as React from "react"
import { render } from "enzyme"
import { Tile as ThemelessTile } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Tile = wrapDefaultTheme(ThemelessTile)

describe("InfoTile", () => {
  it("Should render", () => {
    const renderedComponent = render(<Tile label="Country">DE</Tile>)
    expect(renderedComponent).toMatchSnapshot()
  })
})
