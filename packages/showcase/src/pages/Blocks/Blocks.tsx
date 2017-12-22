import * as React from "react"
import { Route } from "react-router-dom"
import { Card, CardHeader } from "@operational/components"

import Canvas from "../../components/Canvas/Canvas"
import PageContent from "../../components/PageContent/PageContent"
import StaticContent from "../../components/StaticContent/StaticContent"
import Filters from "./Filters/Filters"
import introContent from "./intro.docs"

const Intro = () => (
  <Card>
    <CardHeader>Blocks overview</CardHeader>
    <StaticContent markdownContent={introContent} />
  </Card>
)

export default () => (
  <PageContent>
    <Canvas>
      <Route exact path="/blocks" component={Intro} />
      <Route exact path="/blocks/filters" component={Filters} />
    </Canvas>
  </PageContent>
)
