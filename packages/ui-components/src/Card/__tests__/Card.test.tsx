import * as React from "react"
import { shallow } from "enzyme"

import { Card } from "../Card"

describe("Card", () => {
  it("Should render", () => {
    const renderedComponent = shallow(<Card>hi</Card>)
    expect(renderedComponent).toMatchSnapshot()
  })
})
