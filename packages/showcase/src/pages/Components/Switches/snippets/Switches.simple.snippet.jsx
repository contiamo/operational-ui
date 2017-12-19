import * as React from "react"
import { Switch } from "@operational/components"

export default (function() {
  class ComponentWithSwitch extends React.Component {
    state = {
      on: true
    }

    render() {
      return (
        <Switch
          on={this.state.on}
          onChange={newOnState => {
            this.setState(prevState => ({
              on: newOnState
            }))
          }}
        />
      )
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <ComponentWithSwitch />
    </div>
  )
})()
