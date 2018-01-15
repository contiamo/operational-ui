import * as React from "react"
import { Spinner, Card, CardHeader } from "@operational/components"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const simpleSnippet = `
(() => {
  const styles = {
    display: "inline-block",
    margin: 20
  }

  return (
    <div>
      <Spinner css={styles} size={20} />
      <Spinner css={styles} color="#FF0021" spinDuration={4} />
      <Spinner css={styles} color="success" size={40} />
    </div>
  )
})()
`

const propDescription = [
  {
    name: "color",
    description: "Spinner of the color, as a hex value or a color palette code.",
    defaultValue: "info",
    type: "string",
    optional: true
  },
  {
    name: "size",
    description: "Spinner size, either as a number (pixels), or a different unit as string.",
    defaultValue: "40",
    type: "number | string",
    optional: true
  },
  {
    name: "spinDuration",
    description:
      "You can override the amount of time it takes for the spinner to take a full turn. While this is generally discouraged among spinners of the same size, small tweaks are sometimes aesthetically justified.",
    defaultValue: "2",
    type: "number",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Spinners are small siblings to the `Progress` component, used in places where progress comps would be either too
        large or when they're more aesthetically desirable.
      </p>

      <h2>Usage</h2>
      <Playground snippet={simpleSnippet} components={{ Spinner }} />

      <h2>Props</h2>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
