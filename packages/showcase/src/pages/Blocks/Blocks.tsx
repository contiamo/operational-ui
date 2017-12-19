import * as React from "react"
import { Route, withRouter } from "react-router-dom"
import { Card, CardHeader } from "@operational/components"

import Canvas from "../../components/Canvas/Canvas"
import PageContent from "../../components/PageContent/PageContent"
import Sidebar, { ISidebarLink } from "../../components/Sidebar/Sidebar"
import StaticContent from "../../components/StaticContent/StaticContent"
import Filters from "./Filters/Filters"
import introContent from "./intro.docs"

const SidebarWithRouter = withRouter(Sidebar as any)

const Intro = () => (
  <Card>
    <CardHeader>Blocks overview</CardHeader>
    <StaticContent markdownContent={introContent} />
  </Card>
)

const links: ISidebarLink[] = [
  {
    label: "Filters",
    links: [{ url: "/blocks/filters", label: "Filters" }]
  }
]

export default () => (
  <PageContent>
    <SidebarWithRouter links={links} css={{ height: "100%" }} />
    <Canvas>
      <Route exact path="/blocks" component={Intro} />
      <Route exact path="/blocks/filters" component={Filters} />
    </Canvas>
  </PageContent>
)
