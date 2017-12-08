import * as React from "react"
import glamorous from "glamorous"
import SyntaxHighlighter from "react-syntax-highlighter"
import { Tooltip, Card, CardHeader, Heading2Type } from "@operational/components"

import Playground from "../../../components/Playground/Playground"
import Table from "../../../components/PropsTable/PropsTable"
import * as simpleSnippet from "./snippets/Tooltips.simple.snippet"
import propDescription from "./propDescription"

const StickyTooltip = glamorous(Tooltip)({
  position: "relative",
  top: 0,
  left: 0,
  transform: "none"
})

export default () => (
  <Card>
    <CardHeader>Tooltips</CardHeader>
    <p>
      These elements give helpful hints about actions an end-user can perform. They are designed to be reusable, elegant
      and unobtrusive. Tooltips are great for UX. They can (and in many cases should) be used along with, and in, other
      components. For this reason, we took a highly versatile approach to our tooltips.
    </p>

    <Heading2Type>Usage</Heading2Type>
    <Playground snippet={String(simpleSnippet)} components={{ Tooltip }} />

    <Heading2Type>Props</Heading2Type>
    <Table css={{ marginBottom: 32 }} props={propDescription} />
  </Card>
)
