import * as React from "react"
import { Icon, Card, CardHeader, Heading2Type } from "@operational/components"

import Playground from "../../components/Playground"
import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"

const simpleSnippet = `
<div>
  <Icon name="Play" />
  <Icon name="Pause" />
</div>
`

const propDescription = [
  {
    name: "name",
    description: "Icon name, see https://feathericons.com (convert name to PascalCase).",
    defaultValue: "Play",
    type: "string",
    optional: false
  },
  {
    name: "size",
    description: "Size as pre-defined strings.",
    defaultValue: "medium",
    type: "string",
    optional: true
  },
  {
    name: "color",
    description: "Icon color, specified as a hex, or a color name (info, success, warning, error).",
    defaultValue: "black",
    type: "string",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Contiamo's SVG icon set as a single component. It abstracts over different types of icons (<a href="https://feathericons.com">
          Feather Icons
        </a>, custom shapes, SVG sprites) to provide a consistent API as the icon set evolves.
      </p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={simpleSnippet} components={{ Icon }} />

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
