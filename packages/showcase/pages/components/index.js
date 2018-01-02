import { Card, CardHeader } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"
import PageContent from "../../components/PageContent"
import Canvas from "../../components/Canvas"

const introContent = `
Select a component to get started.
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Canvas>
      <Card>
        <StaticContent markdownContent={introContent} />
      </Card>
    </Canvas>
  </Layout>
)
