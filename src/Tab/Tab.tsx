import * as React from "react"
import styled from "react-emotion"

export interface Props {
  className?: string
  children?: React.ReactNode
  /** Make the tab and its content inaccessible */

  disabled?: boolean
  index?: number
  /** Title to be displayed in the tab button */

  title?: string
}

const Div = styled("div")()

const Tab = (props: Props) => <Div className={props.className}>{props.children}</Div>

export default Tab
