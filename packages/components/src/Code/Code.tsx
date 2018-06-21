import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"
import Highlight from "react-highlight"
import { injectGlobal } from "emotion"
import styles from "./global_styles"

injectGlobal`${styles}`

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
