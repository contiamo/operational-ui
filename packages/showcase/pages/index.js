import glamorous from "glamorous"
import { Card, Icon, Heading2Type } from "@operational/components"
import { fetchFromRepo } from "../utils"

import Layout from "../components/Layout"
import StaticContent from "../components/StaticContent"
import { Operational } from "../components/Icons"
import Demo from "../components/Demo"

const TitleBar = glamorous.div(({ theme }) => ({
  padding: `${theme.spacing * 1}px 0`,
  color: "#000",
  position: "relative",
  height: 400,
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  "& h1": {
    ...theme.typography.title,
    fontWeight: 400,
    fontSize: "2.5rem",
    textAlign: "center",
    margin: "10px 0 10px 0"
  },
  "& h2": {
    ...theme.typography.body,
    fontSize: "1.25rem",
    textAlign: "center",
    marginTop: 0
  }
}))

const TitleBarContent = glamorous.div({
  textAlign: "center",
  position: "relative",
  zIndex: 1000,
  "& svg": {
    margin: "auto"
  }
})

const BodyContent = glamorous.div({
  padding: "32px 16px",
  maxWidth: 760,
  margin: "auto"
})

export default class Intro extends React.Component {
  static async getInitialProps() {
    const content = await fetchFromRepo("/README.md", 12, -41)
    return { content }
  }

  render() {
    return (
      <Layout pathname={this.props.url.pathname}>
        <Card css={{ width: "100%", position: "relative", padding: 0 }}>
          <TitleBar>
            <TitleBarContent>
              <Operational size={80} />
              <h1>Operational UI</h1>
              <h2>Building blocks for effective operational interfaces</h2>
            </TitleBarContent>
            <Demo />
          </TitleBar>
          <BodyContent>
            <StaticContent markdownContent={this.props.content} />
          </BodyContent>
        </Card>
      </Layout>
    )
  }
}
