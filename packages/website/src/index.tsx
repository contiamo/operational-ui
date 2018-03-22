import * as React from "react"
import { render } from "react-dom"
import glamorous from "glamorous"
import { Card, Icon, Button, CardHeader, OperationalUI, Chip, Input } from "@operational/components"
import { operational, Theme } from "@operational/theme"

import { Grid, StaticContent, CornerAngle } from "./components"
import { Operational } from "./components/Icons"

const TitleBar = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "showcasetitlebar",
  padding: `${theme.spacing * 1}px 0`,
  margin: -theme.spacing,
  borderTopLeftRadius: 3,
  borderTopRightRadius: 3,
  color: theme.colors.white,
  position: "relative",
  height: "50%",
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
    backgroundColor: theme.colors.sidenavBackground
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
  fontSize: 20,
  margin: "0 6px"
}

const customCardHeaderStyles: {} = {
  height: 48,
  padding: "0 20px"
}

const sexyTheme: Theme = {
  ...operational,
  spacing: 12,
  typography: {
    ...operational.typography,
    heading1: {
      fontWeight: 400,
      textTransform: "none",
      letterSpacing: "normal",
      lineHeight: "1.6",
      fontSize: 20
    },
    body: {
      fontWeight: 400,
      textTransform: "none",
      letterSpacing: "normal",
      lineHeight: "1.6",
      fontSize: 20
    }
  }
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
      <OperationalUI withBaseStyles theme={sexyTheme}>
        <Grid>
          <Card>
            <TitleBar>
              <TitleBarContent>
                <Operational size={86} rotation={this.state.rotation} />
                <h1>Operational UI</h1>
                <h2>Building blocks for effective operational interfaces</h2>
                <TitleBarNav>
                  <a>
                    <Button color="info" css={customButtonStyles}>
                      Read the docs
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
            <StaticContent
              css={{ marginTop: 28 }}
              markdownContent={`\`Operational UI\` is a library made for data-driven decision making. It does its best when used for interfaces that assume familiarity through routine use, prioritizing compactness and subtle hierarchies. 
              
It implements a [design language](https://ui.contiamo.com/docs/design-guidelines) centered around [small effective differences](https://twitter.com/edwardtufte/status/450076034759524352), and prefers [uncomplicated basics]() and [elaborate dataviz]().

It is super simple to use, and it lets you and your team breathe.

Exhales, not sighs.
              `}
            />
          </Card>
          <Card>
            <CardHeader css={customCardHeaderStyles}>Examples</CardHeader>
            <StaticContent
              markdownContent={`
We have some CodeSandbox demos for [simple interface elements](https://codesandbox.io/embed/zq5nm42x84), a [full-featured UI]() and [ visualizations]().
              `}
            />
          </Card>
          <Card>
            <CardHeader css={customCardHeaderStyles}>Made by</CardHeader>
            <StaticContent markdownContent="[Imogen](https://github.com/ImogenF), [Peter](http://peterszerzo.com), [Tejas](http://www.tejaskumar.com) and [Michael](https://github.com/micha-f) at [Contiamo](https://contiamo.com), and [yourself]()." />
          </Card>
          <Card>
            <CardHeader css={customCardHeaderStyles}>Version</CardHeader>
            <a href="https://www.npmjs.com/package/@operational/components">
              <Button css={customButtonStyles} color="info">
                0.1.0-20
              </Button>
            </a>
          </Card>
          <CornerAngle />
        </Grid>
      </OperationalUI>
    )
  }
}

render(<App />, document.querySelector("#app"))
