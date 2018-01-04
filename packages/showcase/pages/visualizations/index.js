import { Card } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"
import { fetchFromRepo } from "../../utils"

export default class extends React.Component {
  static async getInitialProps() {
    const content = await fetchFromRepo("/packages/visualizations/README.md", 1)
    return { content }
  }

  render() {
    return (
      <Layout pathname={this.props.url.pathname}>
        <Card>
          <StaticContent markdownContent={this.props.content} />
        </Card>
      </Layout>
    )
  }
}
