import * as React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "glamorous"

import { Spinner, contiamoTheme } from "../../index"

const Site = () => (
  <ThemeProvider theme={contiamoTheme}>
    <Spinner />
  </ThemeProvider>
)

render(<Site />, document.getElementById("app"))
