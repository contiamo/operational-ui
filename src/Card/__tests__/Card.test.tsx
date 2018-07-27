import { render } from "enzyme"
import * as React from "react"
import { Card as ThemelessCard } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Card = wrapDefaultTheme(ThemelessCard)

describe("Card", () => {
  it("Should render", () => {
    const renderedComponent = render(<Card>hi</Card>)
    expect(renderedComponent).toMatchSnapshot()
  })
})
