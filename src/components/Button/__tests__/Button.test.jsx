// @flow
import React from "react"
import { shallow } from "enzyme"

import { Button } from "../Button"

describe("Button Component", () => {
  it("Should initialize properly", () => {
    expect(shallow(<Button>hi</Button>)).toMatchSnapshot()
  })
  it("Should respond to clicks", () => {
    const myFunc = jest.fn()
    const button = shallow(<Button onClick={() => myFunc()}>Click me</Button>)

    button.simulate("click")

    expect(myFunc).toHaveBeenCalled()
  })
})
