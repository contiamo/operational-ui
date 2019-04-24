import { mount } from "enzyme"
import * as React from "react"
import { itShouldOnlyMountOnce } from "../../__testUtils__/itShouldOnlyMountOnce"
import { Button as ThemelessButton } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Button = wrapDefaultTheme(ThemelessButton)

describe("Button Component", () => {
  const wrapper = mount(<Button data-testid="1">hi</Button>)

  itShouldOnlyMountOnce("Button", Button)
  it("should have a 'button' tag without 'to' props", () => {
    expect(wrapper.find(`button[data-testid="1"]`).exists()).toBeTruthy()
  })

  it("should have a 'a' tag with 'to' props", () => {
    expect(
      wrapper
        .setProps({ to: "#" })
        .find(`a[data-testid="1"]`)
        .exists(),
    ).toBeTruthy()
  })
})
