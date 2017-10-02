import * as React from "react"
import { shallow } from "enzyme"

import { SidebarItem } from "../SidebarItem"

describe("SidebarItem", () => {
  it("Should initialize", () => {
    const renderedComponent = shallow(<SidebarItem>Hola, compadre!</SidebarItem>)
    expect(renderedComponent).toMatchSnapshot()
    expect(renderedComponent.state().updating).toBe(false)
  })
  it("Should handle asynchronous requests before expanding", async () => {
    const myPromise = () => new Promise(resolve => setTimeout(() => resolve(true), 1)),
      renderedComponent = shallow(<SidebarItem onClick={() => myPromise()}>Hola, compadre!</SidebarItem>)

    await renderedComponent.instance().toggle()
    expect(renderedComponent.state().open).toBe(true)
  })
  it("Should toggle", () => {
    const renderedComponent = shallow(<SidebarItem>Hola, compadre!</SidebarItem>)

    expect(renderedComponent.state().open).toBe(false)
    renderedComponent.instance().toggle()
    expect(renderedComponent.state().open).toBe(true)
  })
  it("Shouldn't toggle if there are no children", () => {
    const renderedComponent = shallow(<SidebarItem />)

    expect(renderedComponent.state().open).toBe(false)
    renderedComponent.instance().toggle()
    expect(renderedComponent.state().open).toBe(false)
  })
})
