import * as React from "react"
import { ThemeProvider } from "glamorous"

// Wrap each ui component in its own theme provider to make sure the default
// Contiamo theme is always available. Props are passed along unaltered.
export const wrapTheme = (theme: any) => (Comp: any): any => {
  return (props: any) => (
    <ThemeProvider theme={theme}>
      <Comp {...props} />
    </ThemeProvider>
  )
}
