import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  /** Id */
  id?: string
  /** Class name */

  className?: string
  /** Children as a list of `Button` elements. Avoid mixing condensed and full-height buttons. */

  children?: React.ReactNode
}

const Container = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    label: "buttongroup",
    "& > button": {
      margin: 0,
    },
    "& > button:not(:first-child)": {
      borderLeft: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    "& > button:not(:last-child)": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  }),
)

const ButtonGroup = (props: Props) => (
  <Container id={props.id} className={props.className}>
    {props.children}
  </Container>
)

export default ButtonGroup
