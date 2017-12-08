import * as React from "react"
import { Paginator, Card, CardHeader, Heading2Type } from "@operational/components"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import * as PaginatorSnippet from "./snippets/Paginator.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Paginator</CardHeader>

    <p>Simple component to navigate through pages</p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(PaginatorSnippet)} components={{ Paginator }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
