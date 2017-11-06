import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Breakdown, Card, CardHeader, Theme } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Breakdown.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Breakdown</CardHeader>

    <p>
      Breakdowns are a means of representing aggregated data in a way that should be relatively easy to reason about.
      The breakdown component itself belongs within the context of a larger container component that calculates numbers
      and supplies them to said component.
    </p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ Breakdown }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
