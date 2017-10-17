import * as React from "react"
import { Route, withRouter } from "react-router-dom"

import { Card, CardHeader } from "contiamo-ui-components"
import Canvas from "../../components/Canvas/Canvas"
import Sidebar, { ISidebarLink } from "../../components/Sidebar/Sidebar"
import StaticContent from "../../components/StaticContent/StaticContent"

const SidebarWithRouter = withRouter(Sidebar)

const introContent: string = `
The *contiamo-ui-components* holds a set of opinionated presentational components, composed components and data visualizations that implement a visual style well-suited for operational interfaces.

These interfaces are generally compact with little color, catered to users who use them regularly and spend the time to get deeply familiar. Spaced-out, airy elements, especially ones that hide functionality to make the spacing possible, are discouraged. Digging into more detail, the library prefers:
* predominantly white and grey elements. Colors reserved for main call-to-action elements, or where data changes.
* flat appearance with light shadows adding a touch of depth.
* light grey background with content in container elements called cards.
* mostly the same font size. To indicate emphasis and hierarchy, prefer bolder and darker over bigger.
`

const Intro = () => (
  <Card>
    <CardHeader>Style guide</CardHeader>
    <StaticContent markdownContent={introContent} />
  </Card>
)

const themeContent: string = `
Contiamo theme.
`

const Theme = () => (
  <Card>
    <CardHeader>Theme</CardHeader>
    <StaticContent markdownContent={themeContent} />
  </Card>
)

const links: ISidebarLink[] = [
  {
    label: "Style guide",
    links: []
  },
  {
    label: "Theme",
    links: []
  }
]

export default () => (
  <div>
    <SidebarWithRouter links={links} css={{ height: "100%" }} />
    <Canvas>
      <Route exact path="/styleguide" component={Intro} />
      <Route path="/styleguide/theme" component={Theme} />
    </Canvas>
  </div>
)
