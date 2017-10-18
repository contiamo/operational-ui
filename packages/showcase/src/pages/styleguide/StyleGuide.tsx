import * as React from "react"
import { Route, withRouter } from "react-router-dom"

import { Card, CardHeader } from "contiamo-ui-components"
import Canvas from "../../components/Canvas/Canvas"
import Sidebar, { ISidebarLink } from "../../components/Sidebar/Sidebar"
import StaticContent from "../../components/StaticContent/StaticContent"

const SidebarWithRouter = withRouter(Sidebar)

const introContent: string = `
The *contiamo-ui-components* package holds a set of opinionated presentational components, composed components and data visualizations that implement a visual style well-suited for operational interfaces.

These interfaces assume regular use and familiarity by operatives. They are compact, flat, with little color, achieving contrast and hierarchy with subtle touches of color, spacing and font weight.

## General principles
* colors are used sparsely for main call-to-action elements or where date changes. Most of the interface is white/grey.
* flat appearance with light shadows adding a touch of depth.
* light grey background with all content white, light-shadowed cards arranged in a grid.
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
