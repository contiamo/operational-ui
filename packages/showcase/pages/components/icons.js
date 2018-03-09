import * as React from "react"
import { Icon, Card, CardHeader } from "@operational/components"

import { Layout, Props, Playground, StaticContent } from "../../components"

const simpleSnippet = `
<div>
  <p>Here are some <a href="https://feathericons.com">Feather Icons</a>:</p>
  <Icon name="Play" size={36} />
  <Icon name="Pause" size={36} />
  <Icon name="Check" size={36} color="#00bb00" />
  <Icon name="X" size={36} color="error" />
  <p>And here some brand icons:</p>
  <Icon name="OperationalUI" size={36} />
  <Icon name="Labs" size={36} />
</div>
`

const propDescription = [
  {
    name: "name",
    description:
      "Icon name. See https://feathericons.com (convert name to PascalCase) for feather icons. For OperationalUI brand icons, use the values `OperationalUI`, `Labs`, `Components`, `Blocks` and `Visualizations`",
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
        </a>{" "}
        and custom shapes) to provide a consistent API as the icon set evolves.
      </p>

      <h2>Usage</h2>
      <Playground snippet={simpleSnippet} components={{ Icon }} />
    </Card>
    <Card />
    <Card>
      <CardHeader>Props</CardHeader>
      <Props props={propDescription} />
    </Card>
  </Layout>
)
