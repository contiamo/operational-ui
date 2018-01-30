import * as React from "react"
import { Card, CardHeader } from "@operational/components"
import StaticContent from "../../components/StaticContent"
import Layout from "../../components/Layout"
import { fetchFromRepo } from "../../utils"

export default class Components extends React.Component {
  static async getInitialProps() {
    const content = await fetchFromRepo("/packages/components/README.md")
    return { content: content.split("<!-- separator -->")[1] }
  }

  render() {
    return (
      <Layout pathname={this.props.url.pathname}>
        <Card>
          <StaticContent
            markdownContent={
              this.props.content +
              `
## Diving in

Select a component in the sidenav to get started. For a higher-level overview on how to best work with these components in code, head to our [API design guide](https://ui.contiamo.com/docs/api-design).
          `
            }
          />
        </Card>
      </Layout>
    )
  }
}
