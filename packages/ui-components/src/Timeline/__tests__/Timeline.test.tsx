import * as React from "react"
import { render, mount } from "enzyme"

import ThemelessTimeline from "../Timeline"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Timeline = wrapDefaultTheme(ThemelessTimeline)

describe("Timeline", () => {
  it("Should render properly", () => {
    const renderedComponent = render(<Timeline></Timeline>)
    expect(renderedComponent).toMatchSnapshot()
  })
})