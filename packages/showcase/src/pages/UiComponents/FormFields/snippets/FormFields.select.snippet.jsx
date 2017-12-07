import * as React from "react"
import { Select } from "@operational/components"

export default (() => {
  const options = [
    { label: "Option 1", value: "one" },
    { label: "Option 2", value: "two" },
    { label: "Option 3", value: "three" },
    { label: "Option 4", value: "four" },
    { label: "Option 5", value: "five" },
    { label: "Option 6", value: "six" },
    { label: "Option 7", value: "seven" },
    { label: "Option 8", value: "eight" }
  ]

  class ComponentWithSelect extends React.Component {
    state = {
      value: []
    }

    render() {
      return (
        <Select
          value={this.state.value}
          options={options}
          filterable
          placeholder="Choose an option"
          onChange={newValue => {
            this.setState(prevState => ({
              value: newValue
            }))
          }}
        />
      )
    }
  }

  return <ComponentWithSelect />
})()
