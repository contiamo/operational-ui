import * as React from "react"
import { render } from "react-dom"
import { contiamoTheme } from "contiamo-ui-components"
import { ThemeProvider } from "glamorous"

import(`../../packages/showcase/src/pages/${PAGE_NAME}/${PAGE_NAME}`).then(({ default: Comp }) => {
  render(
    <ThemeProvider theme={contiamoTheme}>
      <Comp />
    </ThemeProvider>,
    document.getElementById("app")
  )
})
