import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

export interface IProps {
  children?: React.ReactNode
  disabled?: boolean
  index?: number
  title?: string
}

export default ({ children, ...rest }: IProps) => <div>{children}</div>
