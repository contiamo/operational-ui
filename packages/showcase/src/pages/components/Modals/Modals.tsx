import * as React from "react"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import { Modal, Card, CardHeader } from "contiamo-ui-components"

import * as simpleSnippet from "./snippets/Modals.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Modals</CardHeader>

    <p>Modals are customizable full-screen alert boxes.</p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ Modal }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
