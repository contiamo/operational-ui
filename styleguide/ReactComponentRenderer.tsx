import * as React from "react"
import { Card } from "../src"

const ReactComponentRenderer: React.SFC<any> = ({
  classes,
  name,
  heading,
  pathLine,
  description,
  docs,
  examples,
  tabButtons,
  tabBody,
}) => (
  <Card id={name.toLowerCase()}>
    {heading} {/* See ./SectionHeadingRenderer.tsx */}
    {examples}
    {tabButtons}
    <div style={{ marginTop: 16 }}>{tabBody}</div>
  </Card>
)

export default ReactComponentRenderer
