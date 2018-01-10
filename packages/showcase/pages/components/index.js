import * as React from "react"
import { Card, CardHeader } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"
import { fetchFromRepo } from "../../utils"

export default class Components extends React.Component {
  static async getInitialProps() {
    const content = await fetchFromRepo("/packages/components/README.md", 1)
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
