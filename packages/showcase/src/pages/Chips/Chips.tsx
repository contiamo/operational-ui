import * as React from "react"

import Playground from "../../components/Playground/Playground"
import Table from "../../components/PropsTable/PropsTable"
import { Chip, PlusChip, CardHeader } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Chips.simple.snippet"
import * as plusSnippet from "./snippets/Chips.plus.snippet"
import propDescription from "./propDescription"

export default () => (
  <div>
    <CardHeader>Chips</CardHeader>

    <p>
      Most commonly used for filters, these elements represent small bits of information that give a sense of context to
      the user. Chips can be interactive, or simply informative. They can take on any color passed through `props`,
      along with a symbol for the button that will be displayed if click behavior is detected.
    </p>

    <div style={{ display: "flex" }}>
      <Chip css={{ marginBottom: 16 }}>Chip 1</Chip>
      <Chip css={{ marginBottom: 16 }}>Chip 2</Chip>
    </div>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ Chip }} />

    <h4>Props</h4>
    <Table props={propDescription.chip} />

    <div style={{ marginBottom: 32 }} />

    <CardHeader>PlusChip</CardHeader>

    <p>
      A PlusChip is a specialized chip that bears no label, but simply takes an action and displays a symbol prompting
      the action. These chips can either contain their own symbol, or simply have a plus if no symbol is specified.
    </p>

    <h4>Usage</h4>
    <Playground snippet={String(plusSnippet)} components={{ PlusChip }} />

    <h4>Props</h4>
    <Table props={propDescription.plusChip} />
  </div>
)
