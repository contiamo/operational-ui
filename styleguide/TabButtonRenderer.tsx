import * as React from "react"
import { Button } from "../src"

export interface TabButtonRendererProps {
  onClick: React.EventHandler<React.SyntheticEvent<MouseEvent>>
  children: React.ReactNode | React.ReactNode[]
}

const TabButtonRenderer: React.SFC<TabButtonRendererProps> = ({ onClick, children }) => (
  <Button onClick={onClick}>{children}</Button>
)

export default TabButtonRenderer
