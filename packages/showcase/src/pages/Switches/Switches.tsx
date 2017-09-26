import * as React from "react"

import Playground from "../../components/Playground/Playground"
import { Switch, CardHeader } from "contiamo-ui-components"

import Table from "../../components/PropsTable/PropsTable"

import * as simpleSnippet from "./snippets/Switches.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <div>
    <CardHeader>Switch</CardHeader>

    <p>A switch is a simple toggle indicating whether a specific functionality is enabled or disabled.</p>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ Switch }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </div>
)
