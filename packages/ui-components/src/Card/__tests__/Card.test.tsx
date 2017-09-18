import * as React from "react"
import { shallow } from "enzyme"

import ThemelessCard from "../Card"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Card = wrapDefaultTheme(ThemelessCard)

describe("Card", () => {
  it("Should render", () => {
    const renderedComponent = shallow(<Card>hi</Card>)
    expect(renderedComponent).toMatchSnapshot()
  })
})
