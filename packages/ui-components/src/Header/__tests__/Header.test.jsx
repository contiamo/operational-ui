// @flow
import React from "react"
import { shallow } from "enzyme"

import { Header, style } from "../Header"

import theme from "../../theme"

describe("Header", () => {
  it("Header component renders", () => {
    const output = shallow(<Header className="hi">Hello</Header>)
    expect(output).toMatchSnapshot()
  })
  it("Should receive proper styles", () => {
    expect(style({ theme, color: "#fff" })).toMatchObject({})
  })
})
