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
    description: "Either 'IDE', or of an `MxN` format, with `M` and `N` as integers.",
    defaultValue: "3x2",
    type: "string",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <StaticContent
        markdownContent={`
A grid component with the following predefined options:
* 'IDE': a grid used to implement an IDE, with a narrow column on the left for the folder tree browser, and a wide one on the right for code.
* 'MxN': an M-by-N grid of any integers.

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
