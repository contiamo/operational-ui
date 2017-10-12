import * as React from "react"

import { Select } from "contiamo-ui-components"

export default (() => {
  const options = [
    { id: 1, label: "Option 1", value: "one" },
    { id: 2, label: "Option 2", value: "two" },
    { id: 3, label: "Option 3", value: "three" }
  ]

  class ComponentWithSelect extends React.Component {
    state: { value: any[] } = {
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
