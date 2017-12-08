import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

export interface IProps {
  children?: React.ReactNode
  disabled?: boolean
  index?: number
  title?: string
}

const Tab: React.SFC<IProps> = ({ children, ...rest }: IProps) => <div>{children}</div>

export default Tab
