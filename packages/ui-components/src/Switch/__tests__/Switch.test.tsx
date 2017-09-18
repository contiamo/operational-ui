import * as React from "react"
import { render, mount } from "enzyme"

import ThemelessSwitch from "../Switch"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Switch = wrapDefaultTheme(ThemelessSwitch)

describe("Switch", () => {
  it("Should render", () => {
    const renderedComponent = render(<Switch on />)
    expect(renderedComponent).toMatchSnapshot()
  })
  it("Should respond to clicks", () => {
    const myFunc = jest.fn()
    const switchEl = mount(<Switch on onChange={() => myFunc()} />)

    switchEl.simulate("click")

    expect(myFunc).toHaveBeenCalled()
  })
})
