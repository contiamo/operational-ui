import * as React from "react"

import Playground from "component-playground"
import { Stat as DemoStat, CardHeader } from "contiamo-ui-components"

import Table from "../../../components/PropsTable/PropsTable"

import * as snippet from "./snippets/stats.snippet"
import propDescription from "./propDescription"
import { toReactPlayground } from "../../../utils/snippet"

export default () =>
  <div>
    <CardHeader>Stats</CardHeader>

    <p>
      Stats are little pieces of information that contain a descriptor and a value of the descriptor. These elements are
      commonly used to represent KPI data, with strong key-value pairings.
    </p>

    <div style={{ display: "flex" }}>
      <DemoStat label="Components">200,000</DemoStat>
      <DemoStat label="Reusability">High</DemoStat>
      <DemoStat label="Potential Added Value">&euro;2M</DemoStat>
    </div>

    <h4>Usage</h4>
    <Playground codeText={toReactPlayground(String(snippet))} scope={{ React, Stat: DemoStat }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </div>
