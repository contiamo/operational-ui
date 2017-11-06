import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { DatePicker, Card, CardHeader, Heading2Type } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/DatePickers.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>DatePicker</CardHeader>

    <p>DatePickers can currently be used to pick an period bound by two day selections.</p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} components={{ DatePicker }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
