import * as React from "react"
import { Breakdown, Card, CardHeader, Heading2Type } from "@operational/components"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const simpleSnippet = `
<div>
  <Breakdown number={1} label="50 (20%)" fill={0.2}>
    Stat 1
  </Breakdown>
  <Breakdown number={2} label="20 (40%)" fill={0.4}>
    Stat 2
  </Breakdown>
  <Breakdown number={3} label="40 (80%)" fill={0.8}>
    Stat 3
  </Breakdown>
</div>
`

const propDescription = [
  {
    name: "number",
    description: "A number by which the breakdown is represented.",
    defaultValue: "-",
    type: "number",
    optional: false
  },
  {
    name: "label",
    description: "A statistic number label within the bar of the breakdown",
    defaultValue: "-",
    type: "string",
    optional: false
  },
  {
    name: "fill",
    description:
      "The percentage to fill the bar. This is typically passed in from a container component that calculates percentages at large.",
    defaultValue: "-",
    type: "number",
    optional: false
  },
  {
    name: "color",
    description: "A theme palette color name, or a hex code that the bar will be colored with.",
    defaultValue: "*info*",
    type: "string",
    optional: true
  },
  {
    name: "icon",
    description: "An icon that is displayed on the breakdown",
    defaultValue: "-",
    type: "string",
    optional: true
  },
  {
    name: "onMouseEnter/onMouseLeave",
    description:
      "Functions that are invoked when the mouse enters and/or leaves the breakdown. Useful for tooltips/infowindows",
    defaultValue: "-",
    type: "func",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Breakdowns are a means of representing aggregated data in a way that should be relatively easy to reason about.
        The breakdown component itself belongs within the context of a larger container component that calculates
        numbers and supplies them to said component.
      </p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={String(simpleSnippet)} components={{ Breakdown }} />

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
