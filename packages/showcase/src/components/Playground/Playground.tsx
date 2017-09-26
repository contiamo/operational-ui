import * as React from "react"
import { ReactElement } from "react"
import { ThemeProvider } from "glamorous"
import ComponentPlayground from "component-playground"

import wrapDefaultTheme from "../../utils/wrap-default-theme"
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
    wrappedComponents[key] = wrapDefaultTheme(comps[key])
  }
  return (
    <ComponentPlayground
      codeText={transformSnippet(snippet)}
      scope={{ React, ...wrappedComponents, ...(scope || {}) }}
    />
  )
}

export default Playground
