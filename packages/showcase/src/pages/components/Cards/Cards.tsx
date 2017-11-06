import * as React from "react"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
import { Card, CardHeader } from "contiamo-ui-components"
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
      <img
        alt="Image"
        src="http://1.bp.blogspot.com/-TMQ0popcxJ0/Tdk9o2tS4fI/AAAAAAAAVjk/HF7UhI-M4Hs/s1600/Hey+%253B+%2529.png"
      />
    </Card>

    <h4>Usage</h4>
    <Playground snippet={String(simpleSnippet)} components={{ Card }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </Card>
)
