import * as React from "react"
import { Card, CardHeader, Timeline, TimelineItem } from "@operational/components"

import Playground from "../../components/Playground"
import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"

const simpleSnippet = `
(() => {
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
`

const propDescription = {
  Timeline: [],
  TimelineItem: [
    {
      name: "color",
      description: "It can be a named theme color or a hex value.",
      defaultValue: "info",
      type: "string",
      optional: true
    },
    {
      name: "icon",
      description: "Icon name, see https://feathericons.com/ (convert name to PascalCase)",
      defaultValue: "''",
      type: "string",
      optional: true
    }
  ]
}

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>Display information vertically on a timeline from top to bottom.</p>
      <h2>Usage</h2>
      <p>
        A timeline is composed of multiple TimeLineItem componenets nested inside a container Timeline component. Items
        may contain any children.
      </p>
      <Playground snippet={simpleSnippet} components={{ Timeline, TimelineItem }} />

      <h2>Props</h2>
      <Table props={propDescription.TimelineItem} />
    </Card>
  </Layout>
)
