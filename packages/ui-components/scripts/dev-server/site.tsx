import * as React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "glamorous"

import { DatePicker, contiamoTheme } from "../../index"

class Site extends React.Component<{}, {}> {
  state = {
    start: '2017-10-03',
    end: '2017-10-13'
  }

  render() {
    return (
      <ThemeProvider theme={contiamoTheme}>
        <div style={{padding: 40}}>
          <DatePicker start={this.state.start} end={this.state.end} onChange={newState => {this.setState(prevState => newState)}} />
        </div>
      </ThemeProvider>
    )
  }
}

render(<Site />, document.getElementById("app"))
