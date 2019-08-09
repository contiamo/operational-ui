import * as React from "react"
import { Page } from "../src"

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
  <Page fill title={name} id={name}>
    {tabButtons}
    <div style={{ marginTop: 16 }}>{tabBody}</div>
    {examples}
  </Page>
)

export default ReactComponentRenderer
