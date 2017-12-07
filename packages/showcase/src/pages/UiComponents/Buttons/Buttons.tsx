import * as React from "react"
import { Button, ButtonGroup, Card, CardHeader, Heading2Type } from "@operational/components"

import Table from "../../../components/PropsTable/PropsTable"
import Playground from "../../../components/Playground/Playground"
import * as simpleSnippet from "./snippets/Buttons.simple.snippet"
import * as groupSnippet from "./snippets/Buttons.group.snippet"
import * as condensedSnippet from "./snippets/Buttons.condensed.snippet"
import propDescription from "./propDescription"

export default () => (
  <Card>
    <CardHeader>Buttons</CardHeader>

    <p>
      Buttons are used heavily throughout an operational interface, and they often require a fair amount of
      customization. They exist independently or in groups, and can shrink to a condensed mode if space is short. These
      buttons can also take on any number of colors required.
    </p>

    <Heading2Type>Simple usage</Heading2Type>
    <p>
      Using buttons is as simple as including the component with a text node as a child. Colors may be specified as hex
      strings, or as a pre-defined color key from the theme.
    </p>
    <Playground snippet={String(simpleSnippet)} components={{ Button, ButtonGroup }} />

    <Heading2Type>Button groups</Heading2Type>
    <p>
      If used within the button group component, the library takes care to remove intermediate spacings, border radii
      and makes sure borders don't double up.
    </p>
    <Playground snippet={String(groupSnippet)} components={{ Button, ButtonGroup }} />

    <Heading2Type>Condensed mode</Heading2Type>
    <p>Buttons can be condensed, and further grouped to achieve, among other things, this paginator-style look:</p>
    <Playground snippet={String(condensedSnippet)} components={{ Button, ButtonGroup }} />

    <Heading2Type>Props</Heading2Type>
    <Table props={propDescription} />
  </Card>
)
