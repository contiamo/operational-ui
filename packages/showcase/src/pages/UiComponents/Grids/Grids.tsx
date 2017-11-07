import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Grid, Card, CardHeader, Heading2Type } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Grids.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Grids</CardHeader>

    <p>
      Grid component based on CSS grid spec. Beware <a href="http://caniuse.com/#search=grid">browser support</a>.
    </p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} components={{ Grid }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
