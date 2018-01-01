import * as React from "react"
import { Chip, PlusChip, Card, CardHeader, Heading2Type } from "@operational/components"

import Layout from "../../components/Layout"
import Canvas from "../../components/Canvas"
import Playground from "../../components/Playground"
import Table from "../../components/PropsTable"

const simpleSnippet = `
  <div style={{ display: "flex" }}>
    {/* These work well in a flex-ed parent */}
    <Chip color="#006847">Hola</Chip>
    <Chip color="#fff">Compadre</Chip>

    <Chip color="#CE1126" symbol="!" onClick={() => window.alert("Muy bien!")}>
      Como estas?
    </Chip>
    {/* onClick can do literally anything you want it to */}
  </div>
`

const plusSnippet = `
<div style={{ display: "flex" }}>
  <PlusChip color="#f0f" size={31} onClick={() => window.alert("Ouch!")} />
  <PlusChip color="#f00" size={31} onClick={() => window.alert("Smiling is healthy!")}>
        😁
  </PlusChip>
</div>
`

const propDescription = {
  chip: [
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
  ],
  plusChip: [
    {
      name: "color",
      description: "What color of chip would you like? It can be a hex value or a named theme color.",
      defaultValue: "Black",
      type: "string",
      optional: true
    },
    {
      name: "size",
      description: "The size of the chip in pixels. This can vary for obvious reasons.",
      defaultValue: "16",
      type: "number",
      optional: true
    },
    {
      name: "onClick",
      description: "A function that will be called on click of the PlusChip.",
      defaultValue: "",
      type: "func",
      optional: true
    }
  ]
}

export default props => (
  <Layout pathname={props.url.pathname}>
    <Canvas>
      <Card>
        <CardHeader>Chips</CardHeader>

        <p>
          Most commonly used for filters, these elements represent small bits of information that give a sense of
          context to the user. Chips can be interactive, or simply informative. They can take on any color passed
          through `props`, along with a symbol for the button that will be displayed if click behavior is detected.
        </p>

        <Heading2Type>Usage</Heading2Type>
        <Playground snippet={String(simpleSnippet)} components={{ Chip }} />

        <Heading2Type>Props</Heading2Type>
        <Table props={propDescription.chip} />

        <div style={{ marginBottom: 32 }} />

        <CardHeader>PlusChip</CardHeader>

        <p>
          A PlusChip is a specialized chip that bears no label, but simply takes an action and displays a symbol
          prompting the action. These chips can either contain their own symbol, or simply have a plus if no symbol is
          specified.
        </p>

        <Heading2Type>Usage</Heading2Type>
        <Playground snippet={String(plusSnippet)} components={{ Chip, PlusChip }} />

        <Heading2Type>Props</Heading2Type>
        <Table props={propDescription.plusChip} />
      </Card>
    </Canvas>
  </Layout>
)

