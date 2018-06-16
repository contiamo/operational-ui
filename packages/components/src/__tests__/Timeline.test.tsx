import * as React from "react"
import { render } from "enzyme"
import { Timeline as ThemelessTimeline, TimelineItem } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"
const Timeline = wrapDefaultTheme(ThemelessTimeline)
describe("Timeline", () => {
  it("Should render", () => {
    const component = (
      <Timeline>
        <TimelineItem>Test</TimelineItem>
      </Timeline>
    )
    const renderedComponent = render(component)
    expect(renderedComponent).toMatchSnapshot()
  })
})
