import * as React from "react"
import { Card, Heading2Type, Message } from "@operational/components"

import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"
import Layout from "../../components/Layout"

const simpleSnippet = `
<Message color="info">
  This is an important message from the New York City Police Department. Keep your belongings in sight at all times. Protect yourself. If you see a suspicious activity on the platform or train, do not keep it to yourself. Tell a police officer or an MTA employee. Remain alert and have a safe day!
</Message>
`

const propDescription = [
  {
    name: "onClose",
    description: "Called when close icon is clicked. Icon is not rendered at all if this prop is not specified.",
    defaultValue: "",
    type: "() => void",
    optional: true
  },
  {
    name: "children",
    description: "Message contents, can be any html element/React fragment.",
    defaultValue: "",
    type: "ReactElement",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Messages are the primitive building blocks for notification systems common in frontend applications. A single
        message simply includes some body (any html/React element) and an optional close icon.
      </p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={simpleSnippet} components={{ Message }} />

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
