import * as React from "react"
import { Route, withRouter } from "react-router-dom"
import { Div } from "glamorous"

import Canvas from "../../components/Canvas/Canvas"
import Sidebar from "../../visualizations/Sidebar/Sidebar"

const SidebarWithRouter = withRouter(Sidebar),
  InfoTooltip = () => <Div>Choose a Visualization to Get Started</Div>

export default () => (
  <Div
    css={{
      display: "flex",
      alignItems: "flex-start",
      padding: 16,
      width: "100%",
      height: "100vh"
    }}
  >
    <SidebarWithRouter css={{ height: "100%" }} />
    <Canvas>
      <Route exact path="/visualizations" component={InfoTooltip} />
    </Canvas>
  </Div>
)
