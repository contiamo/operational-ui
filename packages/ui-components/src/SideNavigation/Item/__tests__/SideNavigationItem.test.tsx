import * as React from "react"
import { shallow, mount } from "enzyme"

import ThemelessSideNavigationItem from "../SideNavigationItem"
import wrapDefaultTheme from "../../../../utils/wrap-default-theme"

const SideNavigationItem = wrapDefaultTheme(ThemelessSideNavigationItem)

test("SideNavigationItem component renders", () => {
  const output = shallow(<SideNavigationItem>Hi, I'm an Item</SideNavigationItem>)
  expect(output).toMatchSnapshot()
})

test("SideNavigationItem handles clicks", () => {
  const click = jest.fn()
  const output = mount(<SideNavigationItem onClick={click}>Hi, I'm an Item</SideNavigationItem>)

  output.simulate("click")
  expect(click).toHaveBeenCalled()
})
