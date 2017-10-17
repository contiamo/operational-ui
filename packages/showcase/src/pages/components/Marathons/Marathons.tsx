import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Marathon, Card, CardHeader } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Marathons.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Marathons</CardHeader>

    <p>Visual test runner component.</p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ Marathon }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
