import * as React from "react"
import { Chip, PlusChip, Card, CardHeader } from "@operational/components"

import { Layout, Props, Playground, StaticContent } from "../../components"

const simpleSnippet = `
<div style={{ display: "flex" }}>
  <Chip color="info">Hello!</Chip>
  <Chip color="success" icon="X" onIconClick={() => window.alert("Buonasera")} onClick={() => window.alert("Good evening!")}>Ciao!</Chip>
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
    name: "onClick",
    description:
      "Handle clicks on the chip's body. This is never triggered when the icon bar is clicked. When an icon is not specified, however, this basically turns into a full element click handler.",
    defaultValue: "",
    type: "() => void",
    optional: true
  },
  {
    name: "icon",
    description:
      "The name of the icon shown in the right icon bar area of the chip. A typical use here would be the `X` icon for closing the chip. Note that this icon is only displayed if there is an `onIconClick` prop present.",
    defaultValue: "",
    type: "string",
    optional: true
  },
  {
    name: "onIconClick",
    description: "Handle clicks on the chip's icon area on the right",
    defaultValue: "",
    type: "() => void",
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
    </Card>
    <Card />
    <Card>
      <CardHeader>Props</CardHeader>
      <Props props={propDescription} />
    </Card>
  </Layout>
)
