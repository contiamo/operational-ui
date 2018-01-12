import * as React from "react"
import { Chip, PlusChip, Card, CardHeader } from "@operational/components"

import Layout from "../../components/Layout"
import Playground from "../../components/Playground"
import Table from "../../components/PropsTable"

const simpleSnippet = `
<div style={{ display: "flex" }}>
  <Chip color="info">Hello!</Chip>
  <Chip color="success" symbol="!" onClick={() => window.alert("Buonasera!")}>Ciao!</Chip>
</div>
`

const propDescription = [
  {
    name: "color",
    description: "What color of chip would you like? It can be a hex value or a named theme color.",
    defaultValue: "The `primary` color of your theme.",
    type: "string",
    optional: true
  },
  {
    name: "symbol",
    description: "The symbol that is shown on mouse over of a clickable chip.",
    defaultValue: "",
    type: "string",
    optional: true
  },
  {
    name: "onClick",
    description:
      "Is this interactive? If yes, what happens when the chip is clicked? This is commonly used to delete a filter in a list of filters.",
    defaultValue: "",
    type: "func",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Most commonly used for filters, these elements represent small bits of information that give a sense of context
        to the user. Chips can be interactive, or simply informative. They can take on any color passed through `props`,
        along with a symbol for the button that will be displayed if click behavior is detected.
      </p>

      <h2>Usage</h2>
      <Playground snippet={simpleSnippet} components={{ Chip }} />

      <h2>Props</h2>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
