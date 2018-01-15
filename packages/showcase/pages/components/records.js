import * as React from "react"
import {
  Card,
  Heading2Type,
  Record,
  RecordSummary,
  RecordDetails,
  Heading1Type,
  InfoTile
} from "@operational/components"

import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"
import Layout from "../../components/Layout"

const simpleSnippet = `
<Record>
  <RecordSummary>
    <Heading1Type>Deutsche Bahn (German Railway Company)</Heading1Type>
  </RecordSummary>
  <RecordDetails>
    <InfoTile label="Founded">1994</InfoTile>
    <InfoTile label="Employees">~300,000</InfoTile>
    <InfoTile label="Annual Revenue">A lot!</InfoTile>
  </RecordDetails>
</Record>
`

const propDescription = [
  {
    name: "children",
    description:
      "Children, typically a single <RecordSummary/> element and a single optional <RecordDetails/> element.",
    defaultValue: "",
    type: "React.ReactElement",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>Records are great components!</p>

      <Heading2Type>Usage</Heading2Type>
      <Playground
        snippet={simpleSnippet}
        components={{ Record }}
        scope={{ RecordSummary, RecordDetails, Heading1Type, InfoTile }}
      />

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
