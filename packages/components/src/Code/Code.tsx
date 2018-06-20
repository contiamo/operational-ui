import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"
import { Css } from "../types"
import * as hljs from "highlight.js"

export interface Props {
  /** Id */
  id?: string

  /** `css` prop as expected in a glamorous component */
  css?: Css

  /** Language for syntax highlighting */
  syntax?: string

  className?: string

  children?: any
}

const Pre = styled("pre")(
  ({ theme }: { theme?: OperationalStyleConstants }): {} => {
    return {
      backgroundColor: "rgba(20, 153, 206, 0.05)",
      border: "1px solid rgba(20, 153, 206, 0.1)",
      borderRadius: theme.borderRadius,
      padding: theme.space.small,
    }
  },
)

const Container = styled("code")(
  ({ theme }: { theme?: OperationalStyleConstants }): {} => {
    return {
      overflow: "hidden",
      backgroundColor: "transparent",
      fontSize: theme.font.size.body,
      fontFamily: theme.font.family.code,
    }
  },
)

const Code = (props: Props) => {
  hljs.initHighlightingOnLoad()
  return (
    <Pre>
      <Container className={props.syntax}>{props.children}</Container>
    </Pre>
  )
}

export default Code
