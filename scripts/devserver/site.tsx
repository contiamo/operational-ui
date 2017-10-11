import * as React from "react"
import { render } from "react-dom"
import { contiamoTheme } from "contiamo-ui-components"
import glamorous, { ThemeProvider } from "glamorous"

declare const PAGE_NAME: string

const pageName = PAGE_NAME

const Container = glamorous.div(({ theme }: { theme: Theme }) => ({
  backgroundColor: contiamoTheme.colors.grey20,
  maxWidth: 840,
  margin: "40px auto"
}))

import(`../../packages/showcase/src/pages/components/${pageName}/${pageName}`).then(({ default: Comp }) => {
  render(
    <ThemeProvider theme={contiamoTheme}>
      <Container>
        <Comp />
      </Container>
    </ThemeProvider>,
    document.getElementById("app")
  )
})
