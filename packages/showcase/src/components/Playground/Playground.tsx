import * as React from "react"
import glamorous, { ThemeProvider } from "glamorous"
import ComponentPlayground from "component-playground"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import transformSnippet from "./transform-snippet"

type Props = {
  snippet: string
  components?: { [id: string]: any }
  scope?: { [id: string]: any }
}

const Container = glamorous.div(({ theme }: { theme: Theme }) => ({
  "& .playground": {
    display: "flex",
    width: "100%",
    maxWidth: 850,
    maxHeight: 400
  },

  "& .playgroundCode": {
    border: "3px solid #dadada"
  },

  "& .playgroundCode, & .playgroundPreview": {
    flex: "1 1 50%"
  },
  "& .playgroundPreview": {
    marginLeft: theme.spacing * 4 / 3
  },
  "& .CodeMirror-wrap.CodeMirror": {
    minHeight: 320
  },
  "& .CodeMirror-code": {
    fontFamily: "monospace"
  },
  "& .CodeMirror-code pre": {
    fontSize: 13,
    lineHeight: 1.3
  }
}))

const Playground: React.SFC<Props> = ({ snippet, components, scope }) => {
  const wrappedComponents: { [id: string]: any } = {}
  const comps = components || {}
  for (const key in comps) {
    wrappedComponents[key] = wrapTheme(contiamoTheme)(comps[key])
  }
  return (
    <Container>
      <ComponentPlayground
        codeText={transformSnippet(snippet)}
        scope={{ React, ...wrappedComponents, ...(scope || {}) }}
      />
    </Container>
  )
}

export default Playground
