import { Card } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"

const introContent = `
Select a block to get started.
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <StaticContent markdownContent={introContent} />
    </Card>
  </Layout>
)
