import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Grid, Card, CardHeader } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Grids.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Grids</CardHeader>

    <p>
      Grid component based on CSS grid spec. Beware <a href="http://caniuse.com/#search=grid">browser support</a>.
    </p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ Grid }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
