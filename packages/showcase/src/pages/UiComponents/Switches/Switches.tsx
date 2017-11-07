import * as React from "react"

import Playground from "../../../components/Playground/Playground"
import { Switch, Card, CardHeader, Heading2Type } from "contiamo-ui-components"

import Table from "../../../components/PropsTable/PropsTable"

import * as simpleSnippet from "./snippets/Switches.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Switch</CardHeader>

    <p>A switch is a simple toggle indicating whether a specific functionality is enabled or disabled.</p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} components={{ Switch }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
