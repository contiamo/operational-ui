import * as React from "react"
import { Card, CardHeader, Heading2Type } from "@operational/components"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
import * as simpleSnippet from "./snippets/Cards.simple.snippet"
import * as headerSnippet from "./snippets/Cards.header.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Cards</CardHeader>
    <p>
      Cards are used to group and lay out content on the interface - in fact, non-scrolling interfaces with a number of
      cards laid out in a grid are the most common use-cases of this project.
    </p>

    <Heading2Type>Usage</Heading2Type>
    <p>Simply add any content inside the card.</p>
    <Playground snippet={String(simpleSnippet)} components={{ Card, CardHeader }} />

    <Heading2Type>Card headers</Heading2Type>
    <p>
      Using a CardHeader component is the standard way to add a title element to the card. This may include not just the
      card title, but also navigation on the right-hand side.
    </p>
    <Playground snippet={String(headerSnippet)} components={{ Card, CardHeader }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
