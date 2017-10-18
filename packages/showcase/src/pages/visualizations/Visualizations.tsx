import * as React from "react"
import { Route, withRouter } from "react-router-dom"

import { Card, CardHeader } from "contiamo-ui-components"
import Canvas from "../../components/Canvas/Canvas"
import Sidebar, { ISidebarLink } from "../../components/Sidebar/Sidebar"
import StaticContent from "../../components/StaticContent/StaticContent"

import ProcessFlow from "./ProcessFlow/ProcessFlow"
import * as processFlowCases from "./ProcessFlow/cases/index"

const SidebarWithRouter = withRouter(Sidebar)

const introContent: string = `
This is an extensive collection of visualizations. Click one on the sidebar to get started.
`

const Intro = () => (
  <Card>
    <CardHeader>Visualizations overview</CardHeader>
    <StaticContent markdownContent={introContent} />
  </Card>
)

const links: ISidebarLink[] = [
  {
    label: "Process Flow",
    links: Object.keys(processFlowCases).map(key => ({ url: `/visualizations/process-flow/${key}`, label: key }))
  },
  {
    label: "Bar chart",
    links: []
  }
]

export default () => (
  <div>
    <SidebarWithRouter links={links} css={{ height: "100%" }} />
    <Canvas>
      <Route exact path="/visualizations" component={Intro} />
      <Route path="/visualizations/process-flow/:case" component={ProcessFlow} />
    </Canvas>
  </div>
)
