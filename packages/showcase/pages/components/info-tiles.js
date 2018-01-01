import * as React from "react"
import { InfoTile, Card, CardHeader, Heading2Type } from "@operational/components"

import Playground from "../../components/Playground"
import Layout from "../../components/Layout"
import Canvas from "../../components/Canvas"
import Table from "../../components/PropsTable"

const snippet = `
<div>
  <InfoTile
    color="info"
    label="Use Cases"
    icon="AlertCircle"
    onAction={() => {
      alert("Oh hello!")
    }}
  >
    Infinite
  </InfoTile>
  <InfoTile label="Potential">Unlimited</InfoTile>
  <InfoTile color="info" label="Cool Factor">
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
    <Canvas>
      <Card>
        <CardHeader>InfoTiles</CardHeader>

        <p>
          InfoTiles are little pieces of information that contain a descriptor and a value of the descriptor. These
          elements are commonly used to represent KPI data, with strong key-value pairings.
        </p>

        <div style={{ display: "flex" }}>
          <InfoTile label="Components">200,000</InfoTile>
          <InfoTile label="Reusability">High</InfoTile>
          <InfoTile label="Potential Added Value">&euro;2M</InfoTile>
        </div>

        <Heading2Type>Usage</Heading2Type>
        <Playground snippet={String(snippet)} components={{ InfoTile }} />

        <Heading2Type>Props</Heading2Type>
        <Table props={propDescription} />
      </Card>
    </Canvas>
  </Layout>
)
