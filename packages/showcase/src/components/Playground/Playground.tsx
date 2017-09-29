import * as React from "react"
import { ReactElement } from "react"
import { ThemeProvider } from "glamorous"
import ComponentPlayground from "component-playground"

import { wrapTheme } from "@contiamo/ui-utils"
import { contiamoTheme } from "@contiamo/ui"
import transformSnippet from "./transform-snippet"

type Props = {
  snippet: string
  components?: { [id: string]: any }
  scope?: { [id: string]: any }
}

const Playground: React.SFC<Props> = ({ snippet, components, scope }) => {
  const wrappedComponents: { [id: string]: any } = {}
  const comps = components || {}
  for (const key in comps) {
    wrappedComponents[key] = wrapTheme(contiamoTheme)(comps[key])
  }
  return (
    <ComponentPlayground
      codeText={transformSnippet(snippet)}
      scope={{ React, ...wrappedComponents, ...(scope || {}) }}
    />
  )
}

export default Playground
