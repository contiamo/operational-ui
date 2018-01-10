import { Card, CardHeader, Heading2Type } from "@operational/components"

import Playground from "../../components/Playground"
import Table from "../../components/PropsTable"
import Layout from "../../components/Layout"

const headerSnippet = `
<Card width={260}>
  <CardHeader>Title for my card</CardHeader>
  <p>Here is a bare card with custom padding.</p>
  <img alt="Cat" src="https://images.unsplash.com/photo-1491485880348-85d48a9e5312?w=500" />
</Card>
`

const simpleSnippet = `
<Card padding={32} width={260}>
  <p>Here is a bare card with custom padding.</p>
  <img alt="Cat" src="https://images.unsplash.com/photo-1491485880348-85d48a9e5312?w=500" />
</Card>
`

const propDescription = [
  {
    name: "width",
    description: "How wide would you like your card to be?",
    defaultValue: "100%",
    type: "number",
    optional: true
  },
  {
    name: "padding",
    description: "How much space do we apply to the inside of the card?",
    defaultValue: "0",
    type: "number",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Cards are used to group and lay out content on the interface - in fact, non-scrolling interfaces with a number
        of cards laid out in a grid are the most common use-cases of this project.
      </p>

      <Heading2Type>Usage</Heading2Type>
      <p>Simply add any content inside the card.</p>
      <Playground snippet={simpleSnippet} components={{ Card, CardHeader }} />

      <Heading2Type>Card headers</Heading2Type>
      <p>
        Using a CardHeader component is the standard way to add a title element to the card. This may include not just
        the card title, but also navigation on the right-hand side.
      </p>
      <Playground snippet={headerSnippet} components={{ Card, CardHeader }} />

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
