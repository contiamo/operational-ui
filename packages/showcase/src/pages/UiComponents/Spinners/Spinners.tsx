import * as React from "react"
import { Spinner, Card, CardHeader, Heading2Type } from "@operational/components"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import * as simpleSnippet from "./snippets/Spinners.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Spinners</CardHeader>

    <p>
      Spinners are small siblings to the `Progress` component, used in places where progress comps would be either too
      large or when they're more aesthetically desirable.
    </p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} components={{ Spinner }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
