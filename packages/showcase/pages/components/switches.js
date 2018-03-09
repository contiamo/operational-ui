import * as React from "react"
import { Switch, Card, CardHeader } from "@operational/components"

import { Layout, Props, Playground, StaticContent } from "../../components"

const simpleSnippet = `
(() => {
  class ComponentWithSwitch extends React.Component {
    state = {
      on: true
    }

    render() {
      return (
        <Switch
          on={this.state.on}
          onChange={newOnState => {
            this.setState(prevState => ({
              on: newOnState
            }))
          }}
        />
      )
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <ComponentWithSwitch />
    </div>
  )
})()
`

const propDescription = [
  {
    name: "on",
    description: "Is the switch on?",
    defaultValue: "",
    type: "boolean",
    optional: false
  },
  {
    name: "onChange",
    description: "A change handler. Passes the new `on` boolean.",
    defaultValue: "void",
    type: "func",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>A switch is a simple toggle indicating whether a specific functionality is enabled or disabled.</p>

      <h2>Usage</h2>
      <Playground snippet={simpleSnippet} components={{ Switch }} />
    </Card>
    <Card />
    <Card>
      <CardHeader>Props</CardHeader>
      <Props props={propDescription} />
    </Card>
  </Layout>
)
