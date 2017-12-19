import * as React from "react"
import { InfoTile, Card, CardHeader, Heading2Type } from "@operational/components"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
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

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(snippet)} components={{ InfoTile }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
