import * as React from "react"
import { Card, Heading2Type, Table } from "@operational/components"

import { Layout, Props, Playground, StaticContent } from "../../components"

const simpleSnippet = `
<Table 
  columns={[ "Name", "Title"]}
  rows={[
    [ "Max", "Carpenter" ],
    [ "Moritz", "Baker" ]
  ]}
/>
`

const propDescription = [
  {
    name: "columns",
    description: "Table column headings",
    defaultValue: "-",
    type: "(string[])[]",
    optional: false
  },
  {
    name: "rows",
    description: "Table rows as an array of array of cells",
    defaultValue: "-",
    type: "(string[])[]",
    optional: false
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>Tables simply render a semantic HTML table structure based on raw data.</p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={simpleSnippet} components={{ Table }} />
    </Card>
    <Card />
    <Card>
      <CardHeader>Props</CardHeader>
      <Props props={propDescription} />
    </Card>
  </Layout>
)
