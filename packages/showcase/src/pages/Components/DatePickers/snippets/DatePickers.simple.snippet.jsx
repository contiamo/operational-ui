import * as React from "react"
import { DatePicker } from "@operational/components"

// Run any code inside the IIFE, as long as a React element is returned
// (you do not need the IIFE, but it is useful to define simple state containers for stateless components)
export default (() => {
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
