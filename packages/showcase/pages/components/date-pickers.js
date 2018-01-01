import * as React from "react"
import { DatePicker, Card, CardHeader, Heading2Type } from "@operational/components"

import Layout from "../../components/Layout"
import Canvas from "../../components/Canvas"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const simpleSnippet = `
(() => {
  class ComponentWithDatePicker extends React.Component {
    state = {
      start: "2017-10-03",
      end: "2017-10-18"
    }
    render() {
      return (
        <DatePicker
          start={this.state.start}
          end={this.state.end}
          placeholder="Pick a date"
          onChange={newState => {
            this.setState(prevState => newState)
          }}
        />
      )
    }
  }

  return <ComponentWithDatePicker />
})()
`

const propDescription = [
  {
    name: "start",
    description: "Start date in the format 2012-10-01.",
    defaultValue: "-",
    type: "string",
    optional: true
  },
  {
    name: "end",
    description: "End date in the format 2012-10-01.",
    defaultValue: "-",
    type: "string",
    optional: true
  },
  {
    name: "onChange",
    description: "Triggered every time the start or end dates change.",
    type: "(change: {start: string, end: string}) => void",
    defaultValue: "-",
    optional: true
  },
  {
    name: "placeholder",
    description: "Placeholder text when no dates selected",
    defaultValue: "",
    type: "string",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Canvas>
      <Card>
        <CardHeader>DatePicker</CardHeader>

        <p>DatePickers can currently be used to pick an period bound by two day selections.</p>

        <Heading2Type>Usage</Heading2Type>
        <Playground snippet={String(simpleSnippet)} components={{ DatePicker }} />

        <Heading2Type>Props</Heading2Type>
        <Table props={propDescription} />
      </Card>
    </Canvas>
  </Layout>
)
