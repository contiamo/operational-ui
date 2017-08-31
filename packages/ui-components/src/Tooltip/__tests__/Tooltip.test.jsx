// @flow
import React from "react"
import { shallow, mount } from "enzyme"

import { Tooltip, style } from "../Tooltip"
import theme from "../../theme"

describe("Tooltip Component", () => {
  it("Should intialize without problems", () => {
    // We use .first().shallow() because it's a wrapped glamorous component.
    const output = shallow(<Tooltip className="test">Hello</Tooltip>)
    expect(output.state().position).toEqual({})
    expect(output).toMatchSnapshot()
  })
  it("Should have a position on mount", () => {
    const output = mount(<Tooltip className="test">Hello</Tooltip>)
    expect(output.state().position).toEqual({
      left: 0,
      position: "fixed",
      top: 0,
      transform: "none"
    })
  })
  it("Should have mount bottom-anchored tooltips properly", () => {
    const output = mount(
      <Tooltip anchor="bottom" className="test">
        Hello
      </Tooltip>
    )
    expect(output.state().position).toEqual({
      bottom: "auto",
      left: 0,
      position: "fixed",
      top: 0,
      transform: "none"
    })
  })
  it("Should receive the remaining untested props", () => {
    const output = mount(<Tooltip className="props" active />)
    expect(output.state().position).toEqual({
      left: 0,
      position: "fixed",
      top: 0,
      transform: "none"
    })
  })
  it("Should receive valid styles", () => {
    expect(style({ theme })).toMatchObject({})
    expect(style({ theme, anchor: "bottom" })).toMatchObject({})
    expect(style({ theme, color: "#f00" })).toMatchObject({})
  })
})
