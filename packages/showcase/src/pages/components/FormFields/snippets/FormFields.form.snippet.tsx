import * as React from "react"
import { Input, Fieldset } from "contiamo-ui-components"

export default (() => {
  const formStyle = {
    maxHeight: 260,
    columns: "2 auto"
  }

  class Form extends React.Component {
    state = {
      value: ""
    }

    render() {
      return (
        <form style={formStyle}>
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
            <DatePicker label="Student since" start="2012-10-03" end="2013-09-30" />
          </Fieldset>
          <Fieldset legend="Product">
            <Input
              label="Type"
              placeholder="Name here"
              name="firstName"
              value={this.state.value}
              onChange={value => {
                this.setState(prevState => ({ value }))
              }}
            />
            <Input
              label="Quantity"
              placeholder="Name here"
              name="lastName"
              value={this.state.value}
              onChange={value => {
                this.setState(prevState => ({ value }))
              }}
            />
          </Fieldset>
        </form>
      )
    }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <Form />
    </div>
  )
})()
