import * as React from "react"

import Playground from "component-playground"

import Table from "../../../components/PropsTable/PropsTable"
import { Card as DemoCard, CardHeader } from "contiamo-ui-components"
import * as snippet from "./snippets/basic.snippet"
import propDescription from "./propDescription"
import { toReactPlayground } from "../../../utils/snippet"

export default () =>
  <div>
    <CardHeader>Cards</CardHeader>
    <p>These elements make up the UI. They accept any type of children and elegantly wrap them.</p>

    <DemoCard css={{ marginBottom: 16 }} width={400} padding={16}>
      Hello, I am a card. And I can contain <em>many</em> different kinds of content.
    </DemoCard>

    <div style={{ display: "flex" }}>
      <DemoCard css={{ marginBottom: 16 }} width={320} padding={16}>
        Hello, we are cards.<br />
      </DemoCard>
      <DemoCard css={{ marginLeft: 16, marginBottom: 16 }} width={320} padding={16}>
        Indeed, we are.<br />
        Indeed, we can.<br />
        <br />
        <img
          alt="Image"
          src="http://1.bp.blogspot.com/-TMQ0popcxJ0/Tdk9o2tS4fI/AAAAAAAAVjk/HF7UhI-M4Hs/s1600/Hey+%253B+%2529.png"
        />
      </DemoCard>
    </div>

    <DemoCard css={{ marginBottom: 32 }}>
      Hello, I am a <em>also</em> card.
    </DemoCard>

    <h4>Usage</h4>
    <Playground codeText={toReactPlayground(String(snippet))} scope={{ React, Card: DemoCard }} />

    <h4>Props</h4>
    <Table props={propDescription} />
  </div>
