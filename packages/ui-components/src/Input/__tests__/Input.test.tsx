import * as React from "react"
import { shallow } from "enzyme"

import { Input } from "../Input"

describe("Input", () => {
  let comp

  comp = shallow(
    <Input className="hi" placeholder="hello" name="bienvenue">
      How are you?
    </Input>
  )

  it("Should initialize", () => {
    expect(comp).toMatchSnapshot()
  })

  it("Should update value based on state", () => {
    comp.simulate("change", { target: { value: "Hello!" } })
    expect(comp.state().value).toBe("Hello!")
  })
})
