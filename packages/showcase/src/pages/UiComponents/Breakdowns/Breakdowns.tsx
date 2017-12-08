import * as React from "react"
import { Breakdown, Card, CardHeader, Heading2Type } from "@operational/components"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import * as simpleSnippet from "./snippets/Breakdowns.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Breakdown</CardHeader>

    <p>
      Breakdowns are a means of representing aggregated data in a way that should be relatively easy to reason about.
      The breakdown component itself belongs within the context of a larger container component that calculates numbers
      and supplies them to said component.
    </p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} components={{ Breakdown }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
