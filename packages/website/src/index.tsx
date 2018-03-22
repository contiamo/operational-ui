import * as React from "react"
import { render } from "react-dom"
import glamorous from "glamorous"
import { Card, Icon, Button, CardHeader, OperationalUI } from "@operational/components"
import { Theme } from "@operational/theme"

import { Grid, StaticContent } from "./components"
import { Operational } from "./components/Icons"

const TitleBar = glamorous.div(({ theme }: { theme: Theme }): {} => ({
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
    fontSize: "36px",
    textAlign: "center",
    margin: "10px 0 0 0"
  },
  "& h2": {
    ...theme.typography.body,
    fontSize: "24px",
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

const customButtonStyles: {} = {
  fontSize: 18,
  margin: "0 6px",
}

export default class App extends React.Component<{}, {}> {
  state = {
    rotation: 0
  }

  rotationInterval: any

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
      <OperationalUI withBaseStyles>
        <Grid>
          <Card>
            <TitleBar>
              <TitleBarContent>
                <Operational size={80} rotation={this.state.rotation} />
                <h1>Operational UI</h1>
                <h2>Building blocks for effective operational interfaces</h2>
                <TitleBarNav>
                  <a>
                    <Button color="info" css={customButtonStyles}>
                      Get started
                    </Button>
                  </a>
                  <a href="https://github.com/contiamo/operational-ui">
                    <Button color="black" css={customButtonStyles}>
                      GitHub
                    </Button>
                  </a>
                </TitleBarNav>
              </TitleBarContent>
            </TitleBar>
            <StaticContent markdownContent="`Operational UI` is a set of building blocks optimized for UI's supporting operational decision-making. It does best when used for data-driven interfaces that assume familiarity through routine use, prioritizing compactness and space-efficiency. It implements a [design language](https://ui.contiamo.com/docs/design-guidelines) centered around [small effective differences](https://twitter.com/edwardtufte/status/450076034759524352) and an opinionated layout." />
          </Card>
          <Card />
          <Card />
          <Card />
        </Grid>
      </OperationalUI>
    )
  }
}

render(<App />, document.querySelector("#app"))
