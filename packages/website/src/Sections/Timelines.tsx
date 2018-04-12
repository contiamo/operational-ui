import * as React from "react"
import { Timeline, TimelineItem } from "@operational/components"

export const title = "Timelines"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/timeline.md"

export const Component = () => (
  <React.Fragment>
    <Timeline>
      <TimelineItem>Event 1</TimelineItem>
      <TimelineItem>Event 2</TimelineItem>
      <TimelineItem color="error">Event 3</TimelineItem>
      <TimelineItem>Event 4</TimelineItem>
    </Timeline>
  </React.Fragment>
)
