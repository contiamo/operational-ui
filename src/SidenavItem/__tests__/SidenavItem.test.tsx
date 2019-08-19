import * as React from "react"

import { mount } from "enzyme"
import { SidenavItem as ThemelessSidenavItem } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"
import { UserIcon } from "../../Icon"

const SidenavItem = wrapDefaultTheme(ThemelessSidenavItem)

describe("SidenavItem Component", () => {
  const wrapper = mount(<SidenavItem data-testid="1" label="My Account" icon={UserIcon} />)

  it("should have a 'div' tag without 'to' props", () => {
    expect(wrapper.find(`div[data-testid="1"]`).exists()).toBeTruthy()
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
