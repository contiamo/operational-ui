import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Tabs, Tab, Card, CardHeader } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Tabs.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Tabs</CardHeader>
    <p>
      Component used to navigate across multiple views. It's composed of multiple <a href="#tab">Tab</a> components.
    </p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ Tabs, Tab }} />

    <h4>Props</h4>
    <Table props={propDescription.Tabs} />

    <div style={{ marginBottom: 32 }} />

    <CardHeader id="tab">Tab</CardHeader>

    <Table props={propDescription.Tab} />
  </Card>
)
