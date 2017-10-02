import * as React from "react"

import Playground from "../../components/Playground/Playground"
import { InfoTile, Card, CardHeader } from "contiamo-ui-components"

import Table from "../../components/PropsTable/PropsTable"

import * as snippet from "./snippets/InfoTiles.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>InfoTiles</CardHeader>

    <p>
      InfoTiles are little pieces of information that contain a descriptor and a value of the descriptor. These elements
      are commonly used to represent KPI data, with strong key-value pairings.
    </p>

    <div style={{ display: "flex" }}>
      <InfoTile label="Components">200,000</InfoTile>
      <InfoTile label="Reusability">High</InfoTile>
      <InfoTile label="Potential Added Value">&euro;2M</InfoTile>
    </div>

    <h4>Usage</h4>
    <Playground snippet={String(snippet)} components={{ InfoTile }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
