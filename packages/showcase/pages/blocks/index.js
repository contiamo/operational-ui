import { Card, CardHeader } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"
import PageContent from "../../components/PageContent"
import Canvas from "../../components/Canvas"

const introContent = `
Select a block to get started.
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Canvas>
      <Card>
        <CardHeader>Blocks overview</CardHeader>
        <StaticContent markdownContent={introContent} />
      </Card>
    </Canvas>
  </Layout>
)

