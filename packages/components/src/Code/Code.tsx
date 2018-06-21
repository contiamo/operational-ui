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
  /** Code string to highlight */
  code?: string
  children?: any
}

const Container = styled("div")(
  ({ theme }: { theme?: OperationalStyleConstants }): {} => {
    return {
      margin: 0,
      backgroundColor: "rgba(20, 153, 206, 0.05)",
      border: "1px solid rgba(20, 153, 206, 0.1)",
      borderRadius: theme.borderRadius,
      padding: `0 ${theme.space.small}px`,
    }
  },
)

const StyledHighlight = styled(Highlight)(
  (): {} => {
    return {
      background: "transparent",
    }
  },
)

const Code = (props: Props) => (
  <Container>
    <StyledHighlight className={`${css(styles)} ${props.syntax}`}>{props.code}</StyledHighlight>
  </Container>
)

export default Code
