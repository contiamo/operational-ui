import * as React from "react"
import { Timeline, TimelineItem } from "@contiamo/ui"
import glamorous from "glamorous"

export default (() => {
  const CustomSpan = ({ children }: any) => (
    <span style={{ fontSize: 12, marginRight: 8, opacity: 0.6 }}>{children}</span>
  )

  return (
    <Timeline>
      <TimelineItem color="success">
        <h3>Service visit - issue resolved</h3>
        <p>
          <CustomSpan>1 week ago</CustomSpan>
          <CustomSpan>Details</CustomSpan>
        </p>
      </TimelineItem>
      <TimelineItem color="error">
        <h3>Network issues</h3>
        <p>
          <CustomSpan>2 days ago</CustomSpan>
          <CustomSpan>Details</CustomSpan>
        </p>
      </TimelineItem>
      <TimelineItem>
        <h3>Contract extended</h3>
        <p>
          <CustomSpan>5 days ago</CustomSpan>
          <CustomSpan>Details</CustomSpan>
        </p>
      </TimelineItem>
      <TimelineItem color="warning">
        <h3>Contract expires in 1 month</h3>
        <p>
          <CustomSpan>2 weeks ago</CustomSpan>
          <CustomSpan>Details</CustomSpan>
        </p>
      </TimelineItem>
      <TimelineItem color="#7a137a" icon="PhoneOutgoing">
        <h3>Survey outreach</h3>
        <p>
          <CustomSpan>2 weeks ago</CustomSpan>
          <CustomSpan>Details</CustomSpan>
        </p>
      </TimelineItem>
    </Timeline>
  )
})()
