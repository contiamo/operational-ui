import * as React from "react"

import { mount } from "enzyme"
import { SidenavHeader as ThemelessSideNavHeader } from "../../"

import wrapDefaultTheme from "../../utils/wrap-default-theme"

const SidenavHeader = wrapDefaultTheme(ThemelessSideNavHeader)

describe("SidenavHeader Component", () => {
  const wrapper = mount(<SidenavHeader data-testid="1" label="Label" />)

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
