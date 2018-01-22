import * as React from "react"
import glamorous from "glamorous"
import SyntaxHighlighter from "react-syntax-highlighter"
import { Tooltip, Card, CardHeader } from "@operational/components"

import Playground from "../../components/Playground"
import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"

const simpleSnippet = `
<div>
  <div style={{position: "relative", width: 80, height: 80, border: "1px solid black"}}>
    <p>I am a box full of mysteries.</p>
    <Tooltip>I uncover them all.</Tooltip>
  </div>
  <div style={{position: "relative", width: 80, height: 80, border: "1px solid black"}}>
    <p>I am a box full of mysteries.</p>
    <Tooltip bottom>I can be here instead!</Tooltip>
  </div>
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
    name: "top",
    type: "boolean",
    description: "Top-positioned tooltip",
    defaultValue: "-",
    optional: true
  },
  {
    name: "bottom",
    type: "boolean",
    description: "Top-positioned tooltip",
    defaultValue: "-",
    optional: true
  },
  {
    name: "left",
    type: "boolean",
    description: "Left-positioned tooltip",
    defaultValue: "-",
    optional: true
  },
  {
    name: "right",
    type: "boolean",
    description: "Right-positioned tooltip",
    defaultValue: "-",
    optional: true
  },
  {
    name: "smart",
    type: "boolean",
    description:
      "Smart-positioned tooltip, with positioning reversed so it doesn't flow out of the window's bounding box. Currently works for left and top-positioned tooltips.",
    defaultValue: "-",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Tooltips give helpful hints about actions an end-user can perform. They are designed to be reusable, elegant and
        unobtrusive. Tooltips are great for UX. They can (and in many cases should) be used along with, and in, other
        components. For this reason, we took a highly versatile approach to our tooltips.
      </p>

      <h2>Usage</h2>
      <Playground snippet={simpleSnippet} components={{ Tooltip }} />

      <h2>Props</h2>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
