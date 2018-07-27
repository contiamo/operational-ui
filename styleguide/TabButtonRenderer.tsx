import * as React from "react"
import { Button } from "../src"

export interface TabButtonRendererProps {
  onClick: (e?: React.SyntheticEvent<React.ReactNode> | undefined) => void
  children: React.ReactNode | React.ReactNode[]
}

const TabButtonRenderer: React.SFC<TabButtonRendererProps> = ({ onClick, children }) => (
  <Button onClick={onClick}>{children}</Button>
)

export default TabButtonRenderer
