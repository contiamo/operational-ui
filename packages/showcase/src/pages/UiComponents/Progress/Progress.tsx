import * as React from "react"
import { Progress, Card, CardHeader, Heading2Type } from "@operational/components"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import * as basicSnippet from "./snippets/Progress.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Progress</CardHeader>

    <p>Animating progress bar, covering an entire area. Add as a child to any non-statically positioned element.</p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(basicSnippet)} components={{ Progress }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
