import * as React from "react"
import { DatePicker } from "@operational/components"

export const title = "DatePickers"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/date-picker.md"

export const Component = () => (
  <React.Fragment>
    <DatePicker start="2018-04-04" end="2018-04-14" label="Date picker label" />
  </React.Fragment>
)
