import * as React from "react"
import { Route, withRouter } from "react-router-dom"

import { Card, CardHeader } from "contiamo-ui-components"

import Canvas from "../../components/Canvas/Canvas"
import PageContent from "../../components/PageContent/PageContent"
import Sidebar, { ISidebarLink } from "../../components/Sidebar/Sidebar"
import StaticContent from "../../components/StaticContent/StaticContent"
import * as introContent from "./intro.docs.md"

const SidebarWithRouter = withRouter(Sidebar)

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
    </Canvas>
  </PageContent>
)
