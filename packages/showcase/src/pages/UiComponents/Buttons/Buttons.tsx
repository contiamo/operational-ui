import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Button, ButtonGroup, Card, CardHeader, Heading2Type } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Buttons.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Buttons</CardHeader>

    <p>
      Buttons clearly indicate a point of interaction that allow users to perform actions in applications. On Contiamo,
      buttons exist independently, and in groups. These buttons can also take on any number of colors required.
    </p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} components={{ Button, ButtonGroup }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
