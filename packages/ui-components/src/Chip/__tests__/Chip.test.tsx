import * as React from "react"
import { shallow } from "enzyme"

import { Chip } from "../Chip"

describe("Chip", () => {
  it("Should render", () => {
    const renderedComponent = shallow(<Chip>Hi</Chip>)
    expect(renderedComponent).toMatchSnapshot()
  })
  it("Should respond to click events", () => {
    const fn = jest.fn(),
      renderedComponent = shallow(<Chip onClick={fn}>Hi</Chip>).children(".action").shallow()
    renderedComponent.simulate("click")
    expect(fn).toHaveBeenCalled()
  })
})
