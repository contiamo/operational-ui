import * as React from "react"
import glamorous from "glamorous"

export type TabProps = {
  children?: React.ReactChild
  disabled?: boolean
  title?: string
}

const Tab: React.SFC<TabProps> = ({ children, ...rest }: TabProps) => <div>{children}</div>

export default Tab
