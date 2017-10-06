import * as React from "react"
import { render } from "enzyme"

import { SidebarItem } from "../SidebarItem"

describe("SidebarItem", () => {
  it("Should initialize", () => {
    const renderedComponent = render(<SidebarItem>Hola, compadre!</SidebarItem>)
    expect(renderedComponent).toMatchSnapshot()
  })
})
