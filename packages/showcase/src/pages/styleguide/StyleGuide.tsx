import * as React from "react"
import { Route, withRouter } from "react-router-dom"

import { Card, CardHeader } from "contiamo-ui-components"
import Canvas from "../../components/Canvas/Canvas"
import Sidebar, { ISidebarLink } from "../../components/Sidebar/Sidebar"
import StaticContent from "../../components/StaticContent/StaticContent"
import * as introContent from "./intro.docs.md"
import * as apiDesignContent from "./apidesign.docs.md"
import * as visualGuideContent from "./visualguide.docs.md"
import * as themeContent from "./theme.docs.md"

const SidebarWithRouter = withRouter(Sidebar)

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
    links: [{ url: "/styleguide/visualguide", label: "Visual Guide" }]
  },
  {
    label: "API Design",
    links: [{ url: "/styleguide/api", label: "General principles" }, { url: "/styleguide/theming", label: "Theming" }]
  }
]

export default () => (
  <div>
    <SidebarWithRouter links={links} css={{ height: "100%" }} />
    <Canvas>
      <Route exact path="/styleguide" component={Intro} />
      <Route path="/styleguide/visualguide" component={VisualGuide} />
      <Route path="/styleguide/api" component={ApiDesign} />
      <Route path="/styleguide/theming" component={Theming} />
    </Canvas>
  </div>
)
