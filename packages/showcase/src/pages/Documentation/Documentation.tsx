import * as React from "react"
import { Route, withRouter } from "react-router-dom"

import { Card, CardHeader } from "@operational/components"
import Canvas from "../../components/Canvas/Canvas"
import PageContent from "../../components/PageContent/PageContent"
import StaticContent from "../../components/StaticContent/StaticContent"
import introContent from "./intro.docs"
import apiDesignContent from "./apidesign.docs"
import visualGuideContent from "./visualguide.docs"
import themeContent from "./theme.docs"

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

export default () => (
  <PageContent>
    <Canvas>
      <Route exact path="/documentation" component={Intro} />
      <Route path="/documentation/visualguide" component={VisualGuide} />
      <Route path="/documentation/api" component={ApiDesign} />
      <Route path="/documentation/theming" component={Theming} />
    </Canvas>
  </PageContent>
)
