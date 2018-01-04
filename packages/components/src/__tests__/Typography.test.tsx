import * as React from "react"
import { render } from "enzyme"

import { TitleType, Heading1Type, Heading2Type, BodyType, SmallType } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

describe("Timeline", () => {
  it("TitleType should render properly", () => {
    expect(React.createElement(wrapDefaultTheme(TitleType))).toMatchSnapshot()
  })
  it("Heading1Type should render properly", () => {
    expect(React.createElement(wrapDefaultTheme(Heading1Type))).toMatchSnapshot()
  })
  it("Heading2Type should render properly", () => {
    expect(React.createElement(wrapDefaultTheme(Heading2Type))).toMatchSnapshot()
  })
  it("BodyType should render properly", () => {
    expect(React.createElement(wrapDefaultTheme(BodyType))).toMatchSnapshot()
  })
  it("SmallType should render properly", () => {
    expect(React.createElement(wrapDefaultTheme(SmallType))).toMatchSnapshot()
  })
})
