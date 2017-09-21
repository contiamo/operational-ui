import * as React from "react"
import { render, mount } from "enzyme"

import ThemelessInput from "../Input"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Input = wrapDefaultTheme(ThemelessInput)

describe("Input", () => {
  it("Should initialize", () => {
    const input = render(<Input className="hi" value="How are you?" placeholder="hello" name="bienvenue" />)
    expect(input).toMatchSnapshot()
  })

  it("Should respond to change", () => {
    const myFunc = jest.fn()
    const input = mount(
      <Input className="hi" value="How are you?" placeholder="hello" name="bienvenue" onChange={myFunc} />
    )
    input.simulate("change", { target: { value: "Hello!" } })
    expect(myFunc).toHaveBeenCalledWith("Hello!")
  })
})
