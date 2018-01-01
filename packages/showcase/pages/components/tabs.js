import * as React from "react"
import { Tabs, Tab, Card, CardHeader, Heading2Type } from "@operational/components"

import Layout from "../../components/Layout"
import Canvas from "../../components/Canvas"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const simpleSnippet = `
(() => {
  class ComponentWithTab extends React.Component {
    state = {
      tabIndex: 0
    }

    handleChange = (tabIndex) => {
      this.setState({
        tabIndex
      })
    }

    render() {
      return (
        <Tabs onChange={this.handleChange} active={this.state.tabIndex}>
          <Tab title="Tab 1">
            <div>
              <h3>Example panel 1</h3>
              <p>
                Sunt do fugiat non est cupidatat ad et nisi. Adipisicing mollit veniam officia do id. Consequat
                voluptate excepteur ex duis qui adipisicing exercitation minim nostrud non aliquip culpa enim. Aute non
                adipisicing in officia tempor cupidatat culpa fugiat elit sunt nisi eu esse.
              </p>
            </div>
          </Tab>
          <Tab title="Tab 2">
            <div>
              <h3>Example panel 2</h3>
              <p>
                Ex occaecat est esse consectetur labore id sint id ut. Lorem commodo adipisicing ad adipisicing ea
                consectetur esse minim anim pariatur. Excepteur est elit mollit sunt qui excepteur minim fugiat.
              </p>
            </div>
          </Tab>
          <Tab title="Tab 3" disabled>
            <div>
              <h3>Example panel 3</h3>
              <p>
                Non et esse reprehenderit elit in ad nulla mollit. Fugiat nulla consequat esse do est. Enim cupidatat
                sit ullamco pariatur ullamco commodo ipsum deserunt deserunt dolor minim sit magna. Duis adipisicing
                irure irure incididunt non cupidatat est ipsum deserunt ex qui adipisicing.
              </p>
            </div>
          </Tab>
        </Tabs>
      )
    }
  }

  return (
    <div
      style={{
        padding: 15,
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.14)",
        backgroundColor: "#fff",
        minHeight: 221
      }}
    >
      <ComponentWithTab />
    </div>
  )
})()
`

const propDescription = {
  Tabs: [
    {
      name: "active",
      description: "Index of the active tab.",
      defaultValue: "0",
      type: "number",
      optional: true
    },
    {
      name: "activeColor",
      description: "Active color. It can be a hex value or a named theme color.",
      defaultValue: "info",
      type: "string",
      optional: true
    },
    {
      name: "onChange",
      description: "Function to be called once the tab index changes.",
      defaultValue: "() => {}",
      type: "func",
      optional: true
    }
  ],
  Tab: [
    {
      name: "disabled",
      description: "Make the tab and its content inaccessible.",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "title",
      description: "Title to be displayed in the tab button.",
      defaultValue: '""',
      type: "string",
      optional: true
    }
  ]
}

export default props => (
  <Layout pathname={props.url.pathname}>
    <Canvas>
      <Card>
        <CardHeader>Tabs</CardHeader>
        <p>
          Component used to navigate across multiple views. It's composed of multiple <a href="#tab">Tab</a> components.
        </p>

        <Heading2Type>Usage</Heading2Type>
        <Playground snippet={String(simpleSnippet)} components={{ Tabs, Tab }} />

        <Heading2Type>Props</Heading2Type>

        <div style={{ marginBottom: 32 }} />

        <CardHeader id="tab">Tab</CardHeader>

        <Table props={propDescription.Tab} />
      </Card>
    </Canvas>
  </Layout>
)
