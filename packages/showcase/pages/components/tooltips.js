import * as React from "react"
import glamorous from "glamorous"
import SyntaxHighlighter from "react-syntax-highlighter"
import { Tooltip, Card, CardHeader, Heading2Type } from "@operational/components"

import Playground from "../../components/Playground"
import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"

const simpleSnippet = `
<div
  style={{
    width: 120,
    height: 120,
    position: "relative",
    backgroundColor: "black",
    padding: 20,
    boxSizing: "border-box"
  }}
>
  <p style={{ color: "white" }}>I am a box full of mysteries.</p>
  <Tooltip active color="#00f">
    I uncover them all.
  </Tooltip>
</div>
`

const StickyTooltip = glamorous(Tooltip)({
  position: "relative",
  top: 0,
  left: 0,
  transform: "none"
})

const propDescription = [
  {
    name: "color",
    description: "A hex value or a named color from your theme.",
    defaultValue: 'The greys["100"] in your theme.',
    type: "string",
    optional: true
  },
  {
    name: "active",
    description: "Is the tooltip currently visible? This is toggle onMouseEnter of the Tooltip's parent",
    defaultValue: "false",
    type: "boolean",
    optional: true
  },
  {
    name: "anchor",
    description:
      "Should the tooltip be anchored to the middle or bottom of its parent? For bottom anchoring, mouse over the guy on the lower left of this page.",
    defaultValue: "middle",
    type: "middle | bottom",
    optional: true
  },
  {
    name: "*children*",
    description: "What would you like to say in the tooltip?",
    defaultValue: "",
    type: "string",
    optional: false
  },
  {
    name: "betaFixOverflow",
    description:
      "If enabled, the component rerenders with fixed positioning so that the tooltip is visible even if the parent has an overflow: hidden set. Note that this will only look good if the tooltip's element is small and disappears on mouse leave. Currently, `mouseenter` and `mouseleave` logic is up to the library user.",
    defaultValue: "false",
    type: "boolean",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        These elements give helpful hints about actions an end-user can perform. They are designed to be reusable,
        elegant and unobtrusive. Tooltips are great for UX. They can (and in many cases should) be used along with, and
        in, other components. For this reason, we took a highly versatile approach to our tooltips.
      </p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={String(simpleSnippet)} components={{ Tooltip }} />

      <Heading2Type>Props</Heading2Type>
      <Table css={{ marginBottom: 32 }} props={propDescription} />
    </Card>
  </Layout>
)
