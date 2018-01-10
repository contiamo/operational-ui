import { Progress, Card, CardHeader, Heading2Type } from "@operational/components"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const basicSnippet = `
<div style={{ width: 300, height: 240, border: "1px solid #adadad", padding: 20, position: "relative" }}>
  While I patiently wait for my data, this progress bar assures me that things will be ok.
  <Progress />
</div>
`

const propDescription = [
  {
    name: "paused",
    description: "By setting this prop, the animation can be stopped and started again from the same position.",
    defaultValue: "false",
    type: "boolean",
    optional: true
  },
  {
    name: "complete",
    description:
      "If the animation is not marked as complete, the progress bar starts at 80%. Otherwise, it is set to go all the way to the right.",
    defaultValue: "false",
    type: "boolean",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>Animating progress bar, covering an entire area. Add as a child to any non-statically positioned element.</p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={basicSnippet} components={{ Progress }} />

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
