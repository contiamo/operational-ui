import * as React from "react"
import { Input, Fieldset } from "contiamo-ui-components"

export default (() => {
  class StatefulInput extends React.Component {
    state = {
      value: ""
    }

    render() {
      return (
        <Fieldset legend="Customer">
          <Input
            label="First name"
            placeholder="Name here"
            name="firstName"
            value={this.state.value}
            onChange={value => {
              this.setState(prevState => ({ value }))
            }}
          />
          <Input
            label="Last name"
            placeholder="Name here"
            name="lastName"
            value={this.state.value}
            onChange={value => {
              this.setState(prevState => ({ value }))
            }}
          />
        </Fieldset>
      )
    }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <StatefulInput />
    </div>
  )
})()
