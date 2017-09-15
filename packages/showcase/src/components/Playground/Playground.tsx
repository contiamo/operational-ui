import * as React from "react"
import { ReactElement } from "react"
import { ThemeProvider } from "glamorous"
import ComponentPlayground from "component-playground"

import { contiamoTheme } from "contiamo-ui-components"
import transformSnippet from "./transform-snippet"

type Props = {
  snippet: string
  components?: { [id: string]: any }
  scope?: { [id: string]: any }
}

// Wrap each ui component in its own theme provider to make sure the default
// Contiamo theme is always available. Props are passed along unaltered.
function wrapComponent(Comp: any): any {
  return (props: any) => (
    <ThemeProvider theme={contiamoTheme}>
      <Comp {...props} />
    </ThemeProvider>
  )
}

const Playground: React.SFC<Props> = ({ snippet, components, scope }) => {
  const wrappedComponents: { [id: string]: any } = {}
  const comps = components || {}
  for (const key in comps) {
    wrappedComponents[key] = wrapComponent(comps[key])
  }
  return (
    <ComponentPlayground codeText={transformSnippet(snippet)} scope={{ React, ...wrappedComponents, ...scope || {} }} />
  )
}

export default Playground
