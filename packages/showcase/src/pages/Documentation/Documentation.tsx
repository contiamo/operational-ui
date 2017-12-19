import * as React from "react"
import { Route, withRouter } from "react-router-dom"

import { Card, CardHeader } from "@operational/components"
import Canvas from "../../components/Canvas/Canvas"
import PageContent from "../../components/PageContent/PageContent"
import Sidebar, { ISidebarLink } from "../../components/Sidebar/Sidebar"
import StaticContent from "../../components/StaticContent/StaticContent"
import introContent from "./intro.docs"
import apiDesignContent from "./apidesign.docs"
import visualGuideContent from "./visualguide.docs"
import themeContent from "./theme.docs"

const SidebarWithRouter = withRouter(Sidebar as any)

const Intro = () => (
  <Card>
    <CardHeader>Style Guide</CardHeader>
    <StaticContent markdownContent={introContent as string} />
  </Card>
)

const VisualGuide = () => (
  <Card>
    <CardHeader>Visual Guide</CardHeader>
    <StaticContent markdownContent={visualGuideContent as string} />
  </Card>
)

const ApiDesign = () => (
  <Card>
    <CardHeader>General API Design Principles</CardHeader>
    <StaticContent markdownContent={apiDesignContent as string} />
  </Card>
)

const Theming = () => (
  <Card>
    <CardHeader>Customization Through UI Themes</CardHeader>
    <StaticContent markdownContent={themeContent as string} />
  </Card>
)

const links: ISidebarLink[] = [
  {
    label: "Style guide",
    links: [{ url: "/documentation/visualguide", label: "Visual Guide" }]
  },
  {
    label: "API Design",
    links: [
      { url: "/documentation/api", label: "General principles" },
      { url: "/documentation/theming", label: "Theming" }
    ]
  }
]

export default () => (
  <PageContent>
    <SidebarWithRouter links={links} />
    <Canvas>
      <Route exact path="/documentation" component={Intro} />
      <Route path="/documentation/visualguide" component={VisualGuide} />
      <Route path="/documentation/api" component={ApiDesign} />
      <Route path="/documentation/theming" component={Theming} />
    </Canvas>
  </PageContent>
)
