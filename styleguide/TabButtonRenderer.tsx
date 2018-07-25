import * as React from "react"
import { Button } from "../src"

const TabButtonRenderer: React.SFC<any> = ({ classes, name, className, onClick, active, children }) => (
  <Button onClick={onClick}>{children}</Button>
)

export default TabButtonRenderer
