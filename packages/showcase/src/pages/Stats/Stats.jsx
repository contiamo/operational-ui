// @flow
import React from "react"

import Playground from "component-playground"

import Table from "../../components/PropsTable/PropsTable"
import { Stat as DemoStat } from "contiamo-ui-components"

import snippet from "./snippet"
import propDescription from "./propDescription"

export default () =>
  <div>
    <h1>Stats</h1>

    <h2>
      Stats are little pieces of information that contain a descriptor and a
      value of the descriptor.
    </h2>

    <p>
      These elements are commonly used to represent KPI data, with strong
      key-value pairings.
    </p>

    <div style={{ display: "flex" }}>
      <DemoStat label="Components">200,000</DemoStat>
      <DemoStat label="Reusability">High</DemoStat>
      <DemoStat label="Potential Added Value">&euro2M</DemoStat>
    </div>

    <h2>Usage</h2>
    <Playground codeText={snippet} scope={{ React, Stat: DemoStat }} />

    <h2>Props</h2>
    <Table props={propDescription} />
  </div>
