import { Card, CardHeader } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"
import PageContent from "../../components/PageContent"
import Canvas from "../../components/Canvas"

const markdownContent = `
This guide documents the visual and package API design choices that guide \`contiamo-ui-components\`.
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Canvas>
      <Card>
        <StaticContent markdownContent={markdownContent} />
      </Card>
    </Canvas>
  </Layout>
)
