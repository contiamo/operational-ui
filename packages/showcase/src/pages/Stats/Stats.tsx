import * as React from "react"

import Playground from "../../components/Playground/Playground"
import { Stat, Card, CardHeader } from "contiamo-ui-components"

import Table from "../../components/PropsTable/PropsTable"

import * as snippet from "./snippets/stats.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Stats</CardHeader>

    <p>
      Stats are little pieces of information that contain a descriptor and a value of the descriptor. These elements are
      commonly used to represent KPI data, with strong key-value pairings.
    </p>

    <div style={{ display: "flex" }}>
      <Stat label="Components">200,000</Stat>
      <Stat label="Reusability">High</Stat>
      <Stat label="Potential Added Value">&euro;2M</Stat>
    </div>

    <h4>Usage</h4>
    <Playground snippet={String(snippet)} components={{ Stat }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
