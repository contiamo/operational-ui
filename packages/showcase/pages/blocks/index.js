import * as React from "react"
import { Card } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"
import { fetchFromRepo } from "../../utils"

const introContent = `
Select a block to get started.
`

export default class extends React.Component {
  static async getInitialProps() {
    const content = await fetchFromRepo("/packages/blocks/README.md", 1)
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
