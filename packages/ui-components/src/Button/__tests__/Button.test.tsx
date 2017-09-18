import * as React from "react"
import { render, mount } from "enzyme"

import ThemelessButton from "../Button"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Button = wrapDefaultTheme(ThemelessButton)

describe("Button Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Button>hi</Button>)).toMatchSnapshot()
  })
  it("Should respond to clicks", () => {
    const myFunc = jest.fn()
    const button = mount(<Button onClick={() => myFunc()}>Click me</Button>)

    button.simulate("click")

    expect(myFunc).toHaveBeenCalled()
  })
})
