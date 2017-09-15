import * as React from "react"
import { mount, render } from "enzyme"
import { jsdom } from "jsdom"
import { contiamoTheme } from "contiamo-ui-components"

import ColorPickerPage from "../ColorPicker"

import ColorPicker from "../ColorPicker"

/*
  We need a DOM in order to test:
  - colorChange event handling
*/
global.document = jsdom('<!doctype html><html><body><div id="root"></div></body></html>')
global.window = document.parentWindow

describe("ColorPicker Page", () => {
  let comp
  beforeEach(() => {
    comp = mount(<ColorPickerPage theme={contiamoTheme} />, {
      attachTo: document.getElementById("root"),
    })
  })
  it("Should render correctly", () => {
    expect(render(<ColorPickerPage />)).toMatchSnapshot()
  })
  it("Should register event listeners on mount", () => {
    expect(comp.state().color).toBe("#222")
    window.dispatchEvent(new CustomEvent("colorChange", { detail: { hex: "#fff" } }))
    expect(comp.state().color).toBe("#fff")
  })
  it("Should gracefully unmount", () => {
    expect(comp.unmount().component.state.mount).toBe(false)
  })
})
