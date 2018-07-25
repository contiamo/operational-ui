import * as React from "react"
import styled, { css } from "react-emotion"
import Highlight from "react-highlight"
import { OperationalStyleConstants } from "../utils/constants"
import styles from "./styles"

export interface Props {
  /** Id */
  id?: string
  /** Language for syntax highlighting */
  syntax?: string
  children?: string | string[]
}

const Container = styled("div")`
  display: flex;
  flex: 1;
  pre {
    flex: 1;
    display: flex;
    margin: 0;
  }

  code {
    flex: 1;
  }
`

const Code = styled(Highlight)(({ theme }: { theme?: OperationalStyleConstants }) => {
  return {
    margin: 0,
    backgroundColor: "rgba(20, 153, 206, 0.05)",
    border: "1px solid rgba(20, 153, 206, 0.1)",
    borderRadius: theme.borderRadius,
    padding: `${theme.space.small}px`,
  }
})

const StyledCode = (props: Props) => (
  <Container>
    <Code className={`${css(styles)} ${props.syntax}`}>{props.children}</Code>
  </Container>
)

export default StyledCode
