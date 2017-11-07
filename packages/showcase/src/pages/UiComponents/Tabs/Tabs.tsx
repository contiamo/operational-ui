import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Tabs, Tab, Card, CardHeader, Heading2Type } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Tabs.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Tabs</CardHeader>
    <p>
      Component used to navigate across multiple views. It's composed of multiple <a href="#tab">Tab</a> components.
    </p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} components={{ Tabs, Tab }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription.Tabs} />

    <div style={{ marginBottom: 32 }} />

    <CardHeader id="tab">Tab</CardHeader>

    <Table props={propDescription.Tab} />
  </Card>
)
