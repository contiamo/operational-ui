import * as React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "glamorous"

import { DatePicker, contiamoTheme } from "../../index.ts"

const Site = () => (
  <ThemeProvider theme={contiamoTheme}>
    <DatePicker />
  </ThemeProvider>
)

render(<Site />, document.getElementById("app"))
