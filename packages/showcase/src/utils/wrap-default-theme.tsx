import * as React from "react"
import { ThemeProvider } from "glamorous"

import { contiamoTheme } from "contiamo-ui-components"

// Wrap each ui component in its own theme provider to make sure the default
// Contiamo theme is always available. Props are passed along unaltered.
function wrapDefaultTheme(Comp: any): any {
  return (props: any) => (
    <ThemeProvider theme={contiamoTheme}>
      <Comp {...props} />
    </ThemeProvider>
  )
}

export default wrapDefaultTheme
