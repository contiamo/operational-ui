import * as React from "react"

import { Card } from "../src"

export interface ReactComponentRendererProps {
  name: string
  heading: string
  examples: React.ReactNode | React.ReactNode[]
  tabButtons: React.ReactNode | React.ReactNode[]
  tabBody: React.ReactNode
}

const ReactComponentRenderer: React.SFC<ReactComponentRendererProps> = ({
  name,
  heading,
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
