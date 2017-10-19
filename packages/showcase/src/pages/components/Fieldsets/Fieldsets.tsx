import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Fieldset, Card, CardHeader } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Fieldsets.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Fieldsets</CardHeader>

    <p>Fieldsets are great components!</p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ Fieldset }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
