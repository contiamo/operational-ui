import * as React from "react"
import glamorous from "glamorous"
import { Timeline, TimelineItem } from "@operational/components"

export default (() => {
  const CustomSpan = ({ children }) => (
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
    </Timeline>
  )
})()
