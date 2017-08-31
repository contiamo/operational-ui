import React from "react"
import { shallow } from "enzyme"

import { Canvas } from "../Canvas"

describe("App Showcase: Canvas", () => {
  it("Should render correctly", () => {
    expect(shallow(<Canvas>hi</Canvas>)).toMatchSnapshot()
  })
})
