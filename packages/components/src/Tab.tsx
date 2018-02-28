import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

export interface Props {
  children?: React.ReactNode
  disabled?: boolean
  index?: number
  title?: string
}

export default ({ children, ...rest }: Props) => <div>{children}</div>
