import * as React from "react"
import { Timeline, TimelineItem } from "@operational/components"
import * as constants from "../../constants"

export const title = "Timelines"

export const docsUrl = `${constants.docsBaseUrl}/#timeline`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Timelines.tsx`

export const Component = () => (
  <>
    <Timeline>
      <TimelineItem>Event 1</TimelineItem>
      <TimelineItem>Event 2</TimelineItem>
      <TimelineItem color="error">Event 3</TimelineItem>
      <TimelineItem>Event 4</TimelineItem>
    </Timeline>
  </>
)
