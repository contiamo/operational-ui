import * as React from "react"
import { Card, CardHeader, Heading2Type, Select, Input, DatePicker } from "@operational/components"
import { Filter } from "@operational/blocks"

import Layout from "../../components/Layout"
import Canvas from "../../components/Canvas"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const propDescription = [
  {
    name: "children",
    description:
      "contiamo-ui-components forms. Note that the `id` field is mandatory, compared to the case when the form fields are used on their own.",
    defaultValue: "[]",
    type: "ReactNode",
    optional: true
  },
  {
    name: "onClear",
    description:
      "Input fields may be cleared directly from the filter bar, in which case the `onClear` prop is called with the corresponding id. Actually clearing the filter is the responsibility of the parent.",
    defaultValue: "-",
    type: "(id: string) => void",
    optional: true
  }
]

const simpleSnippet = `
(() => {
  class FilterContainer extends React.Component {
    state = {
      name: "Paul",
      occupation: "one",
      availability: {
        start: undefined,
        end: undefined
      }
    }

    render() {
      return (
        <Filter
          onClear={id => {
            if (id === "name") {
              this.setState(prevState => ({
                name: ""
              }))
            } else if (id === "occupation") {
              this.setState(prevState => ({
                occupation: null
              }))
            } else if (id === "availability") {
              this.setState(prevState => ({
                availability: {
                  start: null,
                  end: null
                }
              }))
            }
          }}
        >
          <Input
            label="Name"
            placeholder="Enter name"
            id="name"
            value={this.state.name}
            onChange={newValue => {
              this.setState(prevState => ({
                name: newValue
              }))
            }}
          />
          <Select
            id="occupation"
            label="Occupation"
            value={this.state.occupation}
            onChange={newVal => {
              this.setState(prevState => ({
                occupation: newVal
              }))
            }}
            options={[{ label: "One", value: "one" }, { label: "Two", value: "two" }]}
          />
          <DatePicker
            id="availability"
            label="Availability"
            start={this.state.availability.start}
            end={this.state.availability.end}
            onChange={data => {
              this.setState(prevState => ({
                availability: data
              }))
            }}
          />
        </Filter>
      )
    }
  }

  return <FilterContainer />
})()
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Canvas>
      <Card>
        <CardHeader>Filters</CardHeader>

        <p>
          Filters are opinionated collections of form elements expanded through a modal. They display a very condensed
          summary of the current form state when the modal is not expanded.
        </p>

        <Heading2Type>Usage</Heading2Type>
        <p>Simply nest `@operational/components` form elements using their API.</p>
        <Playground snippet={String(simpleSnippet)} scope={{ Input, Select, DatePicker }} components={{ Filter }} />

        <Heading2Type>Props</Heading2Type>
        <Table props={propDescription} />
      </Card>
    </Canvas>
  </Layout>
)
