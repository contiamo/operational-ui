import * as React from "react"
import { DatePicker } from "@operational/components"
import * as constants from "../../constants"

export const title = "DatePickers"

export const docsUrl = `${constants.docsBaseUrl}/#datepicker`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/DatePickers.tsx`

export interface State {
  start?: string
  end?: string
}

export class Component extends React.Component<{}, State> {
  state = {
    start: "2018-04-04",
    end: "2018-04-14",
  }
  render() {
    return (
      <>
        <DatePicker
          start={this.state.start}
          end={this.state.end}
          onChange={(change: { start?: string; end?: string }) => {
            this.setState(prevState => ({
              ...change,
            }))
          }}
          label="Date picker label"
        />
      </>
    )
  }
}
