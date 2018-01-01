import { Card, CardHeader } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"
import PageContent from "../../components/PageContent"
import Canvas from "../../components/Canvas"

const introContent: string = `
This package contains fully-featured and highly customizable data visualization modules.
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Canvas>
      <Card>
        <CardHeader>Visualizations overview</CardHeader>
        <StaticContent markdownContent={introContent} />
      </Card>
    </Canvas>
  </Layout>
)
