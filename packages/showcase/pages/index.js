import * as React from "react"
import glamorous from "glamorous"
import { Card, Icon, Button, CardHeader } from "@operational/components"

import Layout from "../components/Layout"
import StaticContent from "../components/StaticContent"
import { Operational } from "../components/Icons"

const TitleBar = glamorous.div(({ theme }) => ({
  label: "showcasetitlebar",
  padding: `${theme.spacing * 1}px 0`,
  margin: -theme.spacing,
  color: theme.colors.white,
  position: "relative",
  height: 360,
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
  "&::before": {
    position: "absolute",
    top: 0,
    left: 0,
    content: "' '",
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.sidenavBackground,
    zIndex: 100
  },
  "& h1": {
    ...theme.typography.title,
    fontWeight: 400,
    fontSize: "2.5rem",
    textAlign: "center",
    margin: "10px 0 0 0"
  },
  "& h2": {
    ...theme.typography.body,
    fontSize: "1.25rem",
    textAlign: "center",
    marginTop: 0
  }
}))

const TitleBarContent = glamorous.div({
  label: "showcasetitlebarcontent",
  textAlign: "center",
  position: "relative",
  zIndex: 1000,
  "& svg": {
    margin: "auto"
  }
})

const TitleBarNav = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  marginTop: 20
}))

const BodyContent = glamorous.div({
  padding: "32px 16px",
  maxWidth: 760,
  margin: "auto"
})

export default class Intro extends React.Component {
  state = {
    rotation: 0
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({ rotation: 360 }))
      this.rotationInterval = setInterval(
        () => this.setState(() => ({ rotation: this.state.rotation === 0 ? 360 : 0 })),
        10000
      )
    }, 5000)
  }

  componentWillUnmount() {
    this.rotationInterval && clearInterval(this.rotationInterval)
  }

  render() {
    return (
      <Layout pathname={this.props.url.pathname} noNav>
        <Card>
          <TitleBar>
            <TitleBarContent>
              <Operational size={80} rotation={this.state.rotation} />
              <h1>Operational UI</h1>
              <h2>Building blocks for effective operational interfaces</h2>
              <TitleBarNav>
                <a>
                  <Button color="info">Get started</Button>
                </a>
                <a href="https://github.com/Contiamo/operational-ui">
                  <Button color="black">GitHub</Button>
                </a>
              </TitleBarNav>
            </TitleBarContent>
          </TitleBar>
        </Card>
      </Layout>
    )
  }
}
