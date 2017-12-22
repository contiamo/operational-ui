import * as React from "react"
import { Route, withRouter } from "react-router-dom"
import { Card, CardHeader } from "@operational/components"

import Canvas from "../../components/Canvas/Canvas"
import PageContent from "../../components/PageContent/PageContent"
import Sidebar, { ISidebarLink } from "../../components/Sidebar/Sidebar"
import StaticContent from "../../components/StaticContent/StaticContent"
import ProcessFlowMain from "./ProcessFlows/ProcessFlowMain"
import { ProcessFlowCases } from "./ProcessFlows/ProcessFlows"
import * as processFlowCases from "./ProcessFlows/cases/index"

const SidebarWithRouter = withRouter(Sidebar as any)

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
    links: [{ label: "Main", url: "/visualizations/process-flow/main" }].concat(
      Object.keys(processFlowCases).map((key, i) => {
        return {
          url: `/visualizations/process-flow/cases/${key}`,
          label: `${i + 1}: ${(processFlowCases as any)[key].title}`
        }
      })
    )
  },
  {
    label: "Bar chart",
    links: []
  }
]

export default () => (
  <PageContent>
    <SidebarWithRouter links={links} css={{ marginRight: 16 }} />
    <Canvas>
      <Route exact path="/visualizations" component={Intro} />
      <Route exact path="/visualizations/process-flow/main" component={ProcessFlowMain} />
      <Route path="/visualizations/process-flow/cases/:case" component={ProcessFlowCases} />
    </Canvas>
  </PageContent>
)
