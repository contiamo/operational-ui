import * as React from "react"
import { render, mount } from "enzyme"

import ThemelessChip from "../Chip"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Chip = wrapDefaultTheme(ThemelessChip)

describe("Chip", () => {
  it("Should render", () => {
    const renderedComponent = render(<Chip>Hi</Chip>)
    expect(renderedComponent).toMatchSnapshot()
  })
  it("Should respond to click events", () => {
    const fn = jest.fn()
    const renderedComponent = mount(<Chip onClick={fn}>Hi</Chip>).children(".action")
    renderedComponent.simulate("click")
    expect(fn).toHaveBeenCalled()
  })
})
