import * as React from "react"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
import { Card, CardHeader, Heading2Type } from "contiamo-ui-components"
import * as simpleSnippet from "./snippets/Cards.simple.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Cards</CardHeader>
    <p>These elements make up the UI. They accept any type of children and elegantly wrap them.</p>

    <Card width={400} padding={16}>
      Hello, I am a card. And I can contain <em>many</em> different kinds of content.
    </Card>

    <Card width={320} padding={16}>
      Indeed, we are.<br />
      Indeed, we can.<br />
      <br />
      <img alt="Image" src="https://images.unsplash.com/photo-1491485880348-85d48a9e5312?w=500" />
    </Card>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} components={{ Card }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
