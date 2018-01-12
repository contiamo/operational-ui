import * as React from "react"
import { Grid, Card, CardHeader } from "@operational/components"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const simpleSnippet = `
(() => {
  const TestContainer = props => (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: 10
      }}
    >
      {props.children}
    </div>
  )

  return (
    <div style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
      <Grid columns={["auto", "auto"]} rows={["auto", "auto"]} gap={20}>
        <TestContainer>One</TestContainer>
        <TestContainer>Two</TestContainer>
        <TestContainer>Three</TestContainer>
        <TestContainer>Four</TestContainer>
      </Grid>
    </div>
  )
})()
`

const propDescription = [
  {
    name: "rows",
    description:
      "A list of row dimensions, either a string ('auto', '20%') or a numerical value, which indicates pixels.",
    defaultValue: "['auto', 'auto']",
    type: "(string || number)[]",
    optional: true
  },
  {
    name: "columns",
    description:
      "A list of column dimensions, either a string ('auto', '20%') or a numerical value, which indicates pixels.",
    defaultValue: "['auto', 'auto']",
    type: "(string || number)[]",
    optional: true
  },
  {
    name: "gap",
    description: "Grid gap",
    defaultValue: "theme.spacing",
    type: "number",
    optional: true
  },
  {
    name: "children",
    description: "Child elements.",
    defaultValue: "-",
    type: "ReactElement[]",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Grid component based on CSS grid spec. Beware <a href="http://caniuse.com/#search=grid">browser support</a>.
      </p>

      <h2>Usage</h2>
      <Playground snippet={simpleSnippet} components={{ Grid }} />

      <h2>Props</h2>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
