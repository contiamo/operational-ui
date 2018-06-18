import * as React from "react"
import { render, mount } from "enzyme"
import { Breadcrumbs as ThemelessBreadcrumbs, Breadcrumb } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Breadcrumbs = wrapDefaultTheme(ThemelessBreadcrumbs)

describe("Breadcrumbs Component", () => {
  it("Should initialize properly", () => {
    expect(
      render(
        <Breadcrumbs>
          <Breadcrumb>
            <a href="http://ui.contiamo.com">Home</a>
          </Breadcrumb>
          <Breadcrumb>Link 1</Breadcrumb>
        </Breadcrumbs>,
      ),
    ).toMatchSnapshot()
  })
})
