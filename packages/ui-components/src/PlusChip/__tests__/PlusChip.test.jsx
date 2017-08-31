import React from "react"
import { shallow } from "enzyme"

import { PlusChip } from "../PlusChip"

describe("Plus Chip", () => {
  it("Should correctly render", () => {
    const renderedComponent = shallow(<PlusChip />)
    expect(renderedComponent).toMatchSnapshot()
  })
  it("Should respond to click events", () => {
    const fn = jest.fn(),
      renderedComponent = shallow(<PlusChip onClick={fn} />)

    renderedComponent.simulate("click")

    expect(fn).toHaveBeenCalled()
  })
})
