import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"
import Highlight from "react-highlight"

export interface Props {
  /** Id */
  id?: string
  /** Language for syntax highlighting */
  syntax?: string
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

const StyledHighlight = styled(Highlight)({ background: "transparent" })

const Code = (props: Props) => {
  return (
    <Pre>
      <StyledHighlight style={{ background: "transparent" }} className={props.syntax}>
        {props.children}
      </StyledHighlight>
    </Pre>
  )
}

export default Code
