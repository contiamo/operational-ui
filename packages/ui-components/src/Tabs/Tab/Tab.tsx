import * as React from "react"
import glamorous from "glamorous"

export type TabProps = {
  children?: React.ReactNode
  disabled?: boolean
  index?: number
  title?: string
}

const Tab: React.SFC<TabProps> = ({ children, ...rest }: TabProps) => <div>{children}</div>

export default Tab
