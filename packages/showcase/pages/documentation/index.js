import { Card } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"

const markdownContent = `
This guide documents the visual and package API design choices that guide \`contiamo-ui-components\`.
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <StaticContent markdownContent={markdownContent} />
    </Card>
  </Layout>
)
