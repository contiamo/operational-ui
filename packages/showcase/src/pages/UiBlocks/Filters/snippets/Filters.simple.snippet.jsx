import * as React from "react"
import { Select, Input, DatePicker } from "contiamo-ui-components"
import { Filter } from "contiamo-ui-blocks"

export default (() => {
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
