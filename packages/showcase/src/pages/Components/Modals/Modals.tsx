import * as React from "react"
import { Modal, Card, CardHeader, Heading2Type } from "@operational/components"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import * as simpleSnippet from "./snippets/Modals.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Modals</CardHeader>

    <p>Modals are customizable full-screen alert boxes.</p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} components={{ Modal }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
