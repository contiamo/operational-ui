import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

export interface Props {
  children?: React.ReactNode
  disabled?: boolean
  index?: number
  title?: string
}

const Tab = ({ children, ...rest }: Props) => <div>{children}</div>

export default Tab
