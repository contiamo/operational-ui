import * as React from "react"
import { shallow, mount } from "enzyme"
import { jsdom } from "jsdom"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessColorPicker from "../ColorPicker"

const ColorPicker = wrapDefaultTheme(ThemelessColorPicker)

/*
  We need a DOM in order to test:
  - Click outside to close
  - Press escape to close
*/
global.document = jsdom('<!doctype html><html><body><div id="root"></div></body></html>')
global.window = document.parentWindow

describe("ColorPicker", () => {
  let comp
  beforeEach(() => {
    comp = mount(<ColorPicker />, {
      attachTo: global.document.getElementById("root")
    })
  })
  it("Should initialize properly", () => {
    expect(comp).toMatchSnapshot()
  })
  it("Should be toggled on click", () => {
    comp.simulate("click")
    expect(comp.state().isPickerOpen).toBe(true)

    comp.simulate("click")
    expect(comp.state().isPickerOpen).toBe(false)
  })

  it("Should close on press of Esc", () => {
    const pressEsc = new KeyboardEvent("keyup", { keyCode: 27 })

    comp.simulate("click")
    expect(comp.state().isPickerOpen).toBe(true)

    document.dispatchEvent(pressEsc)
    expect(comp.state().isPickerOpen).toBe(false)
  })

  it("Should close on click outside", () => {
    const clickOutside = new MouseEvent("click")

    comp.simulate("click")
    expect(comp.state().isPickerOpen).toBe(true)

    document.dispatchEvent(clickOutside)
    expect(comp.state().isPickerOpen).toBe(false)
  })

  it("Should gracefully unmount", () => {
    expect(comp.unmount().component.state.mount).toBe(false)
  })
})
