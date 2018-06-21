import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"
import Highlight from "react-highlight"
import { injectGlobal } from "emotion"

injectGlobal`
/*
This stylesheet must be injected into the document in order for the syntax highlighting to work
Direct copy from https://github.com/isagalaev/highlight.js/blob/master/src/styles/vs.css
*/

/*
Visual Studio-like style based on original C# coloring by Jason Diamond <jason@diamond.name>
*/
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: white;
  color: black;
}

.hljs-comment,
.hljs-quote,
.hljs-variable {
  color: #008000;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-built_in,
.hljs-name,
.hljs-tag {
  color: #00f;
}

.hljs-string,
.hljs-title,
.hljs-section,
.hljs-attribute,
.hljs-literal,
.hljs-template-tag,
.hljs-template-variable,
.hljs-type,
.hljs-addition {
  color: #a31515;
}

.hljs-deletion,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-meta {
  color: #2b91af;
}

.hljs-doctag {
  color: #808080;
}

.hljs-attr {
  color: #f00;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link {
  color: #00b0e8;
}


.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
`

export interface Props {
  /** Id */
  id?: string
  /** Language for syntax highlighting */
  syntax?: string
  /** Code string to highlight */
  code?: string
  children?: any
}

const StyledHighlight = styled(Highlight)(
  ({ theme }: { theme?: OperationalStyleConstants }): {} => {
    return {
      margin: 0,
      backgroundColor: "rgba(20, 153, 206, 0.05)",
      border: "1px solid rgba(20, 153, 206, 0.1)",
      borderRadius: theme.borderRadius,
      padding: theme.space.small,
    }
  },
)

const Code = (props: Props) => (
  <StyledHighlight style={{ background: "transparent" }} className={props.syntax}>
    {props.code}
  </StyledHighlight>
)

export default Code
