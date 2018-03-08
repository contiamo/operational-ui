import * as React from "react"
import { Card } from "@operational/components"
import { StaticContent, Layout } from "../../components"
import { fetchFromRepo } from "../../utils"

const introContent = `
Select a block to get started.
`

export default class extends React.Component {
  static async getInitialProps() {
    const content = await fetchFromRepo("/packages/blocks/README.md")
    return { content }
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

Select a block in the sidenav to get started. For a higher-level overview on how to best work with these components in code, head to our [API design guide](https://ui.contiamo.com/docs/api-design).
          `
            }
          />
        </Card>
      </Layout>
    )
  }
}
