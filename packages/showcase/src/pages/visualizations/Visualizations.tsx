import * as React from "react"
import { Route, withRouter } from "react-router-dom"
import { Div } from "glamorous"

import Sidebar from "../../visualizations/Sidebar/Sidebar"
import AppCanvas from "../../components/Canvas/Canvas"

import ProcessFlow1 from "./ProcessFlow/Case01"

const SidebarWithRouter = withRouter(Sidebar),
  InfoTooltip = () => <Div>Choose a Visualization to Get Started</Div>

export default () =>
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
    <AppCanvas css={{ position: "relative", marginLeft: 16, flexBasis: "100%" }}>
      <Route exact path="/visualizations" component={InfoTooltip} />
      <Route path="/visualizations/processFlow/case01" component={ProcessFlow1} />
    </AppCanvas>
  </Div>
