import * as React from "react"
import { DatePicker } from "@operational/components"

export const title = "DatePickers"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/date-picker.md"

export interface State {
  start?: string
  end?: string
}

export class Component extends React.Component<{}, State> {
  state = {
    start: "2018-04-04",
    end: "2018-04-14"
  }
  render() {
    return (
      <React.Fragment>
        <DatePicker
          start={this.state.start}
          end={this.state.end}
          onChange={(change: { start?: string; end?: string }) => {
            this.setState(prevState => ({
              ...change
            }))
          }}
          label="Date picker label"
        />
      </React.Fragment>
    )
  }
}
