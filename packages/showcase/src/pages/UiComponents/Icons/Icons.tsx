import * as React from "react"
import { Icon, Card, CardHeader, Heading2Type } from "@operational/components"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
import * as simpleSnippet from "./snippets/Icons.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Icons</CardHeader>

    <p>
      Contiamo's SVG icon set as a single component. It abstracts over different types of icons (<a href="https://feathericons.com">
        Feather Icons
      </a>, custom shapes, SVG sprites) to provide a consistent API as the icon set evolves.
    </p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} components={{ Icon }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
