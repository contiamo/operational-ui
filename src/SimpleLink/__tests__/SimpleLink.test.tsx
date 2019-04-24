import * as React from "react"

import { mount } from "enzyme"
import { itShouldOnlyMountOnce } from "../../__testUtils__/itShouldOnlyMountOnce"
import { SimpleLink as ThemelessSimpleLink } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const SimpleLink = wrapDefaultTheme(ThemelessSimpleLink)

describe("SimpleLink Component", () => {
  const wrapper = mount(<SimpleLink data-testid="1">hi</SimpleLink>)

  itShouldOnlyMountOnce("SimpleLink", SimpleLink)

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
