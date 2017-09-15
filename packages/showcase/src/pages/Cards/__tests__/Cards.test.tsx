import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessCardsPage from "../Cards"

const CardsPage = wrapDefaultTheme(ThemelessCardsPage)

describe("Cards Page", () => {
  it("Should render correctly", () => {
    expect(render(<CardsPage />)).toMatchSnapshot()
  })
})
