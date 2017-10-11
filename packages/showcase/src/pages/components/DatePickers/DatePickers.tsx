import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { DatePicker, Card, CardHeader } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/DatePickers.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>DatePickers</CardHeader>

    <p>DatePickers are great components!</p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ DatePicker }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
