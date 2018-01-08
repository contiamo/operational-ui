import * as React from "react"
import { Breadcrumb, Breadcrumbs, Card, CardHeader, Heading2Type } from "@operational/components"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const simpleSnippet = `
<Breadcrumbs>
</Breadcrumbs>
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Breakdowns are a means of representing aggregated data in a way that should be relatively easy to reason about.
        The breakdown component itself belongs within the context of a larger container component that calculates
        numbers and supplies them to said component.
      </p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={simpleSnippet} components={{ Breadcrumb, Breadcrumbs }} />

      <Heading2Type>Props</Heading2Type>
      <Table
        props={[
          {
            name: "children",
            description: "Child elements, typically <Breadcrumb>",
            defaultValue: "null",
            type: "ReactElement",
            optional: true
          }
        ]}
      />
    </Card>
  </Layout>
)
