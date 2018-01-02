import { Card } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"

const introContent: string = `
This package contains fully-featured and highly customizable data visualization modules.
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <StaticContent markdownContent={introContent} />
    </Card>
  </Layout>
)
