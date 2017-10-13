import * as React from "react"
import { Route, withRouter } from "react-router-dom"

import Canvas from "../../components/Canvas/Canvas"
import Sidebar from "../../components/Sidebar/Sidebar"

import ProcessFlow from "./ProcessFlow/ProcessFlow"
import * as processFlowData from "./ProcessFlow/data/index"

const SidebarWithRouter = withRouter(Sidebar)

const InfoTooltip = () => <div>Choose a Visualization to Get Started</div>

const links = [
  {
    label: "Process Flow",
    links: Object.keys(processFlowData).map(key => ({ url: `/visualizations/process-flow/${key}`, label: key }))
  },
  {
    label: "Bar chart",
    links: []
  }
]

export default () => (
  <div>
    <SidebarWithRouter links={links} style={{ height: "100%" }} />
    <Canvas>
      <Route exact path="/visualizations" component={InfoTooltip} />
      <Route path="/visualizations/process-flow/:case" component={ProcessFlow} />
    </Canvas>
  </div>
)
