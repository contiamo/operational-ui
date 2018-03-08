import * as React from "react"
import { Grid, Card, CardHeader } from "@operational/components"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"
import StaticContent from "../../components/StaticContent"

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
      <Grid type="2x2"}>
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
    name: "type",
    description: "One of the predefined grid types made available by the library.",
    defaultValue: "3x2",
    type: "'3x2' | '2x2' | '1x1' | 'IDE'",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <StaticContent
        markdownContent={`
A grid component with the following predefined options:
* '3x2': a 3-by-2 uniform grid.
* '2x2': a 3-by-2 uniform grid.
* '1x1': a 3-by-2 uniform grid.
* 'IDE': a grid used to implement an IDE, with a narrow column on the left for the folder tree browser, and a wide one on the right for code.

If you have other special needs, we recommend using the CSS grid directly, as these grid types are build on top of it.
      `}
      />

      <h2>Usage</h2>
      <Playground snippet={simpleSnippet} components={{ Grid }} />

      <h2>Props</h2>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
