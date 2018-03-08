import * as React from "react"
import { Card, CardHeader, Timeline, TimelineItem } from "@operational/components"

import { Layout, Props, Playground, StaticContent } from "../../components"

const simpleSnippet = `
<Timeline>
  <TimelineItem color="success">
    <h3>Service visit - issue resolved</h3>
    <p>1 week ago</p>
  </TimelineItem>
  <TimelineItem color="error">
    <h3>Network issues</h3>
    <p>2 days ago</p>
  </TimelineItem>
  <TimelineItem>
    <h3>Contract extended</h3>
    <p>5 days ago</p>
  </TimelineItem>
  <TimelineItem color="warning">
    <h3>Contract expires in 1 month</h3>
    <p>2 weeks ago</p>
  </TimelineItem>
</Timeline>
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
    </Card>
    <Card />
    <Card>
      <CardHeader>Props</CardHeader>
      <Props
        props={propDescription.TimelineItem}
      />
    </Card>
  </Layout>
)
