import * as React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "glamorous"

import { DatePicker, contiamoTheme } from "../../index"

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
    start: "2017-10-02",
    end: "2017-10-26"
  }

  render() {
    return (
      <ThemeProvider theme={contiamoTheme}>
        <div style={{padding: 40}}>
          <DatePicker label="Select date" start={this.state.start} end={this.state.end} onChange={(newState: any) => {this.setState(prevState => newState)}} />
        </div>
      </ThemeProvider>
    )
  }
}

render(<Site />, document.getElementById("app"))
