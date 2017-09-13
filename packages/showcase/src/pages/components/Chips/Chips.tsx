import * as React from "react"

import Playground from "component-playground"

import Table from "../../../components/PropsTable/PropsTable"
import { Chip as DemoChip, PlusChip as DemoPlusChip, CardHeader } from "contiamo-ui-components"

import simpleSnippet from "./snippets/simple-chip.snippet"
import plusSnippet from "./snippets/plus-chip.snippet"
import { toReactPlayground } from "../../../utils/snippet"
import propDescription from "./propDescription"

export default () =>
  <div>
    <CardHeader>Chips</CardHeader>

    <p>
      Most commonly used for filters, these elements represent small bits of information that give a sense of context to
      the user. Chips can be interactive, or simply informative. They can take on any color passed through `props`,
      along with a symbol for the button that will be displayed if click behavior is detected.
    </p>

    <div style={{ display: "flex" }}>
      <DemoChip css={{ marginBottom: 16 }}>Chip 1</DemoChip>
      <DemoChip css={{ marginBottom: 16 }}>Chip 2</DemoChip>
    </div>

    <h4>Usage</h4>
    <Playground codeText={toReactPlayground(String(simpleSnippet))} scope={{ React, Chip: DemoChip }} />

    <h4>Props</h4>
    <Table props={propDescription.chip} />

    <div style={{ marginBottom: 32 }} />

    <CardHeader>PlusChip</CardHeader>

    <p>
      A PlusChip is a specialized chip that bears no label, but simply takes an action and displays a symbol prompting
      the action. These chips can either contain their own symbol, or simply have a plus if no symbol is specified.
    </p>

    <h4>Usage</h4>
    <Playground codeText={toReactPlayground(String(plusSnippet))} scope={{ React, PlusChip: DemoPlusChip }} />

    <h4>Props</h4>
    <Table props={propDescription.plusChip} />
  </div>
