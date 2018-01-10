import { Button, ButtonGroup, Card, CardHeader, Heading2Type } from "@operational/components"

import Table from "../../components/PropsTable"
import Layout from "../../components/Layout"
import Playground from "../../components/Playground"

const simpleSnippet = `
<div>
  <Button color="info">Button One</Button>
  <Button color="#393939">Button Two</Button>
  <Button disabled>Button Three</Button>
</div>
`

const groupSnippet = `
<ButtonGroup>
  <Button>Group 1</Button>
  <Button active>Group 2</Button>
  <Button>Group 3</Button>
</ButtonGroup>
`

const condensedSnippet = `
<ButtonGroup>
  <Button condensed>1</Button>
  <Button condensed color="success">2</Button>
  <Button condensed>3</Button>
</ButtonGroup>
`

const propDescription = [
  {
    name: "color",
    description: "What color of button would you like? It can be a hex value or a named theme color.",
    defaultValue: "white",
    type: "string",
    optional: true
  },
  {
    name: "onClick",
    description: "What happens when the button is clicked?",
    defaultValue: "",
    type: "func",
    optional: true
  },
  {
    name: "active",
    description: "Active state.",
    defaultValue: "",
    type: "boolean",
    optional: true
  },
  {
    name: "condensed",
    description: "Condensed option",
    defaultValue: "",
    type: "boolean",
    optional: true
  },
  {
    name: "disabled",
    description: "Disabled option",
    defaultValue: "",
    type: "boolean",
    optional: false
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Buttons are used heavily throughout an operational interface, and they often require a fair amount of
        customization. They exist independently or in groups, and can shrink to a condensed mode if space is short.
        These buttons can also take on any number of colors required.
      </p>

      <Heading2Type>Simple usage</Heading2Type>
      <p>
        Using buttons is as simple as including the component with a text node as a child. Colors may be specified as
        hex strings, or as a pre-defined color key from the theme.
      </p>
      <Playground snippet={simpleSnippet} components={{ Button, ButtonGroup }} />

      <Heading2Type>Button groups</Heading2Type>
      <p>
        If used within the button group component, the library takes care to remove intermediate spacings, border radii
        and makes sure borders don't double up.
      </p>
      <Playground snippet={groupSnippet} components={{ Button, ButtonGroup }} />

      <Heading2Type>Condensed mode</Heading2Type>
      <p>Buttons can be condensed, and further grouped to achieve, among other things, this paginator-style look:</p>
      <Playground snippet={condensedSnippet} components={{ Button, ButtonGroup }} />

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
