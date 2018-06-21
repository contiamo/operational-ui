import * as React from "react"
import styled, { css } from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"
import Highlight from "react-highlight"
import styles from "./styles"

export interface Props {
  /** Id */
  id?: string
  /** Language for syntax highlighting */
  syntax?: string
  children?: string | string[]
}

const Code = styled(Highlight)(({ theme }: { theme?: OperationalStyleConstants }) => {
  return {
    margin: 0,
    backgroundColor: "rgba(20, 153, 206, 0.05)",
    border: "1px solid rgba(20, 153, 206, 0.1)",
    borderRadius: theme.borderRadius,
    padding: `${theme.space.small}px`,
  }
})

const StyledCode = (props: Props) => <Code className={`${css(styles)} ${props.syntax}`}>{props.children}</Code>

export default StyledCode
