import * as React from "react"
import styled from "react-emotion"
import { WithTheme, Css } from "../types"
export interface Props {
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  children?: React.ReactNode
  /** Make the tab and its content inaccessible */

  disabled?: boolean
  index?: number
  /** Title to be displayed in the tab button */

  title?: string
}
const Div = styled("div")()

const Tab = (props: Props) => (
  <Div css={props.css} className={props.className}>
    {props.children}
  </Div>
)

export default Tab
