import * as React from "react"
import Waypoint from "react-waypoint"

import { Card } from "../src"
import { Consumer } from "./StyleGuideRenderer"

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
  <Consumer>
    {({ updateActiveComponent }) => (
      <Waypoint
        topOffset="0"
        bottomOffset="95%"
        onPositionChange={({ currentPosition }: { currentPosition: "inside" | "outside" }) => {
          if (currentPosition !== "inside") {
            return
          }
          updateActiveComponent(name)
        }}
      >
        <Card id={name}>
          {heading} {/* See ./SectionHeadingRenderer.tsx */}
          {tabButtons}
          <div style={{ marginTop: 16 }}>{tabBody}</div>
          {examples}
        </Card>
      </Waypoint>
    )}
  </Consumer>
)

export default ReactComponentRenderer
