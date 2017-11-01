import * as React from "react"
import { render } from "enzyme"

import ThemelessTimeline, { TimelineItem } from "../Timeline"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

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
