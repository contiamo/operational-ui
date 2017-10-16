import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Spinner, Card, CardHeader } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Spinners.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Spinners</CardHeader>

    <p>
      Spinners are small siblings to the `Progress` component, used in places where progress comps would be either too
      large or when they're more aesthetically desirable.
    </p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ Spinner }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
