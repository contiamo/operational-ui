import React from "react"
import { shallow } from "enzyme"

import { Button, style } from "../Button"

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
  it("Should receive proper styles", () => {
    expect(style({ theme: {} })).toMatchObject({})
  })
})
