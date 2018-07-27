import * as React from "react"
import { Body, Heading1, Heading2, Small, Title } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

describe("Timeline", () => {
  it("Title should render properly", () => {
    expect(React.createElement(wrapDefaultTheme(Title))).toMatchSnapshot()
  })
  it("Heading1 should render properly", () => {
    expect(React.createElement(wrapDefaultTheme(Heading1))).toMatchSnapshot()
  })
  it("Heading2 should render properly", () => {
    expect(React.createElement(wrapDefaultTheme(Heading2))).toMatchSnapshot()
  })
  it("Body should render properly", () => {
    expect(React.createElement(wrapDefaultTheme(Body))).toMatchSnapshot()
  })
  it("Small should render properly", () => {
    expect(React.createElement(wrapDefaultTheme(Small))).toMatchSnapshot()
  })
})
