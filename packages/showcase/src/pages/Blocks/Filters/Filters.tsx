import * as React from "react"
import { Card, CardHeader, Heading2Type, Select, Input, DatePicker } from "@operational/components"
import { Filter } from "@operational/blocks"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import * as simpleSnippet from "./snippets/Filters.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Filters</CardHeader>

    <p>
      Filters are opinionated collections of form elements expanded through a modal. They display a very condensed
      summary of the current form state when the modal is not expanded.
    </p>

    <Heading2Type>Usage</Heading2Type>
    <p>Simply nest `@operational/components` form elements using their API.</p>
    <Playground snippet={String(simpleSnippet)} scope={{ Input, Select, DatePicker }} components={{ Filter }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
