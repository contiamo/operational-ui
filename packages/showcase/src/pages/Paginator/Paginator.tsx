import * as React from "react"

import Table from "../../components/PropsTable/PropsTable"
import Playground from "../../components/Playground/Playground"
import { Paginator, Card, CardHeader } from "contiamo-ui-components"

import * as PaginatorSnippet from "./snippets/Paginator.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Paginator</CardHeader>

    <p>Simple component to navigate through pages</p>

    <h4>Usage</h4>
    <Playground snippet={String(PaginatorSnippet)} components={{ Paginator }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
