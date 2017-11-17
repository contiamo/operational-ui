import * as React from "react"
import { Select, Input } from "contiamo-ui-components"
import { Filter } from "contiamo-ui-blocks"

export default (() => {
  class FilterContainer extends React.Component {
    state = {
      name: "Paul",
      occupation: "one"
    }

    render() {
      return (
        <Filter>
          <Input label="Name" id="name" value={this.state.name} onChange={newValue => {
            this.setState(prevState => ({
              name: newValue
            }))
          }}/>
          <Select
            label="Occupation"
            value={this.state.occupation}
            onChange={newVal => ({
              occupation: newVal
            })}
            options={[{ label: "One", value: "one" }, { label: "Two", value: "two" }]}
          />
        </Filter>
      )
    }
  }

  return <FilterContainer />
})()
