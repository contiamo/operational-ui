import * as React from "react"
import { render } from "react-dom"
import { contiamoTheme } from "contiamo-ui-components"
import { ThemeProvider } from "glamorous"

const pageName = PAGE_NAME

import(`../../packages/showcase/src/pages/${pageName}/${pageName}`).then(({ default: Comp }) => {
  render(
    <ThemeProvider theme={contiamoTheme}>
      <Comp />
    </ThemeProvider>,
    document.getElementById("app")
  )
})
