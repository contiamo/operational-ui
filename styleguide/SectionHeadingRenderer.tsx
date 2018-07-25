import * as React from "react"
import { CardHeader } from "../src"

const SectionHeadingRenderer: React.SFC<any> = ({ classes, children, toolbar, id, href, depth, deprecated }) => (
  <CardHeader action={toolbar}>{children}</CardHeader>
)

export default SectionHeadingRenderer
