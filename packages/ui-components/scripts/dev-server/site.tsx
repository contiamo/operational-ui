import * as React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "glamorous"

import { Select, contiamoTheme } from "../../index"

const options = [
  {
    label: 'Label1',
    value: 'value1'
  },
  {
    label: 'Label2',
    value: 'value2'
  }
]

class Site extends React.Component<{}, {}> {
  state = {
    value: ['value1']
  }

  render() {
    return (
      <ThemeProvider theme={contiamoTheme}>
        <div style={{padding: 40}}>
          <Select value={this.state.value} options={options} onChange={value => {this.setState(prevState => ({
            value
          }))}} />
        </div>
      </ThemeProvider>
    )
  }
}

render(<Site />, document.getElementById("app"))
