import * as React from "react"

import { mount } from "enzyme"
import { itShouldOnlyMountOnce } from "../../__testUtils__/itShouldOnlyMountOnce"
import { Breadcrumb as ThemelessBreadcrumb } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Breadcrumb = wrapDefaultTheme(ThemelessBreadcrumb)

describe("Breadcrumb Component", () => {
  itShouldOnlyMountOnce("Breadcrumb", Breadcrumb)

  const wrapper = mount(<Breadcrumb data-testid="1">hi</Breadcrumb>)

  it("should have a 'span' tag without 'to' props", () => {
    expect(wrapper.find(`span[data-testid="1"]`).exists()).toBeTruthy()
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
