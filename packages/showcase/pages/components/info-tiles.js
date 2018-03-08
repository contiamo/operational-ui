import * as React from "react"
import { InfoTile, Card, CardHeader } from "@operational/components"

import { Layout, Props, Playground, StaticContent } from "../../components"

const snippet = `
<div>
  <InfoTile label="Use Cases" >Infinite</InfoTile>
  <InfoTile label="Potential">Unlimited</InfoTile>
  <InfoTile label="Cool Factor">
    > 10
  </InfoTile>
</div>
`

const propDescription = [
  {
    name: "label",
    description: "What is the key in the key-value pairing? This is the description of the statistic itself.",
    defaultValue: "",
    type: "string",
    optional: false
  },
  {
    name: "color",
    description:
      "See above. A stat can have its own background color. This can be a hex code, or a named color from your theme.",
    defaultValue: "white",
    type: "string",
    optional: true
  },
  {
    name: "icon",
    description: "React Feather icon name. See `Icon` component.",
    defaultValue: "",
    type: "string",
    optional: true
  },
  {
    name: "onAction",
    description:
      "Method triggered when the top-right action icon is clicked. If not specified, the icon is not rendered at all.",
    defaultValue: "",
    type: "function",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        InfoTiles are little pieces of information that contain a descriptor and a value of the descriptor. These
        elements are commonly used to represent KPI data, with strong key-value pairings.
      </p>

      <div style={{ display: "flex" }}>
        <InfoTile label="Components">200,000</InfoTile>
        <InfoTile label="Reusability">High</InfoTile>
        <InfoTile label="Potential Added Value">&euro;2M</InfoTile>
      </div>

      <h2>Usage</h2>
      <Playground snippet={snippet} components={{ InfoTile }} />
    </Card>
    <Card />
    <Card>
      <CardHeader>Props</CardHeader>
      <Props
        props={propDescription}
      />
    </Card>
  </Layout>
)
