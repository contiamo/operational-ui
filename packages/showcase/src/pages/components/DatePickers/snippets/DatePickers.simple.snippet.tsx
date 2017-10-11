import * as React from "react"
import { DatePicker } from "contiamo-ui-components"

// Run any code inside the IIFE, as long as a React element is returned
// (you do not need the IIFE, but it is useful to define simple state containers for stateless components)
export default (() => {
  class ComponentWithDatePicker extends React.Component {
    state = {
      date: "2015-01-01"
    }
    render() {
      return (
        <DatePicker
          date={this.state.date}
          onChange={date => {
            this.setState(prevState => ({ date }))
          }}
        />
      )
    }
  }

  return <ComponentWithDatePicker />
})()
