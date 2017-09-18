import * as React from "react"
import { Switch } from "contiamo-ui-components"

export default (function() {
  class StatefulSwitch extends React.Component {
    state = {
      on: true
    }

    render() {
      return (
        <Switch
          on={this.state.on}
          onChange={on => {
            this.setState(prevState => ({
              on: on
            }))
          }}
        />
      )
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <StatefulSwitch />
    </div>
  )
})()
