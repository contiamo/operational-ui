import * as React from "react"
import { Card, CardHeader, Spinner, Progress } from "@operational/components"

import { Layout, Props, Playground, StaticContent } from "../../components"

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
      <p>
        Spinners and progress elements are important components of data-driven UI's, especially when data takes a long
        time to load. These components should be easily recognizable, easy to plug into any container, and expressive in
        their looks. Here are some guidelines and code examples on how to use them effectively:
      </p>

      <h2>Spinners</h2>
      <p>Spinners are used to indicate loading state in a smaller element, such as a card or a single, smaller form.</p>

      <h3>Usage</h3>
      <Playground snippet={spinnerSnippet} components={{ Spinner }} />

      <h2>Progress</h2>
      <p>The progress element is used for larger loading sections, most typically the entire page.</p>

      <h3>Usage</h3>
      <Playground snippet={progressSnippet} components={{ Progress }} />
    </Card>
    <Card />
    <Card>
      <CardHeader>Props</CardHeader>
      <Props
        props={spinnerPropDescription}
      />
      <Props
        props={progressPropDescription}
      />
    </Card>
  </Layout>
)
