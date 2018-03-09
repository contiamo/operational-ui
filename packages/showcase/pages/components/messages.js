import * as React from "react"
import { Card, Message } from "@operational/components"

import { Layout, Props, Playground, StaticContent } from "../../components"

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

      <h2>Usage</h2>
      <Playground snippet={simpleSnippet} components={{ Message }} />
    </Card>
    <Card />
    <Card>
      <CardHeader>Props</CardHeader>
      <Props props={propDescription} />
    </Card>
  </Layout>
)
