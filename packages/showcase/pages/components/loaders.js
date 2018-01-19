import * as React from "react"
import { Card, CardHeader, Spinner, Progress } from "@operational/components"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const spinnerSnippet = `
<Spinner/>
`

const progressSnippet = `
<div style={{ width: 300, height: 240, border: "1px solid #adadad", padding: 20, position: "relative" }}>
  While I patiently wait for my data, this progress bar assures me that things will be ok.
  <Progress />
</div>
`

const spinnerPropDescription = []

const progressPropDescription = [
  {
    name: "fadeParent",
    description:
      "Specifies whether the direct parent element should be faded out. If so, <Progress/> adds a near-opaque white overlay over the direct parent to make it clear that the content underneath is not accessible/dated/something new coming.",
    type: "boolean",
    defaultValue: "false",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>Animating progress bar, covering an entire area. Add as a child to any non-statically positioned element.</p>

      <CardHeader>Spinners</CardHeader>
      <p>Spinners are used to indicate loading state in a smaller element, such as a card or a single, smaller form.</p>

      <h2>Usage</h2>
      <Playground snippet={spinnerSnippet} components={{ Spinner }} />

      <h2>Props</h2>
      <Table props={spinnerPropDescription} />

      <CardHeader>Progress</CardHeader>
      <p>The progress element is used for larger loading sections, most typically the entire page.</p>

      <h2>Usage</h2>
      <Playground snippet={progressSnippet} components={{ Progress }} />

      <h2>Props></h2>
      <Table props={progressPropDescription} />
    </Card>
  </Layout>
)
