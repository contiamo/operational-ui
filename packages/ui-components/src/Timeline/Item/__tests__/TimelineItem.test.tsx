import * as React from "react"
import { render, mount } from "enzyme"

import ThemelessTimelineItem from "../TimelineItem"
import wrapDefaultTheme from "../../../../utils/wrap-default-theme"

const TimelineItem = wrapDefaultTheme(ThemelessTimelineItem)

describe("TimelineItem", () => {
  it("Should render properly", () => {
    const renderedComponent = render(<TimelineItem>Test</TimelineItem>)
    expect(renderedComponent).toMatchSnapshot()
  })
})