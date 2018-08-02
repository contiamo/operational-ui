import { render } from "enzyme"
import * as React from "react"
import { Card as ThemelessCard, CardComponent } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

// we need to reinforce type
// because after wrapDefaultTheme it is general React.SFC
// but we want parametric function
const Card = wrapDefaultTheme(ThemelessCard) as CardComponent

describe("Card", () => {
  it("Should render", () => {
    const renderedComponent = render(<Card>hi</Card>)
    expect(renderedComponent).toMatchSnapshot()
  })
})
