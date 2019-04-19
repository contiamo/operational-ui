import * as React from "react"

import { render } from "enzyme"
import { itShouldOnlyMountOnce } from "../../__testUtils__/itShouldOnlyMountOnce"
import { Breadcrumb as ThemelessBreadcrumb } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Breadcrumb = wrapDefaultTheme(ThemelessBreadcrumb)

describe("SidenavItem Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Breadcrumb to="/some-url">Home</Breadcrumb>)).toMatchSnapshot()
  })
  // Needed to allow children in order to test
  itShouldOnlyMountOnce("Breadcrumb", Breadcrumb)
})
