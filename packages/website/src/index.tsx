import * as React from "react"
import { render } from "react-dom"
import glamorous from "glamorous"
import { Card, Icon, Button, CardHeader, OperationalUI, Chip, Input } from "@operational/components"
import { operational, Theme } from "@operational/theme"

import { Grid, StaticContent, CornerAngle, Animation, Hero, Logo } from "./components"

const TitleBarContent = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "showcasetitlebarcontent",
  textAlign: "center",
  position: "relative",
  "& svg": {
    margin: "auto"
  },
  "& h1": {
    ...theme.typography.title,
    margin: "10px 0 0 0"
  },
  "& h2": {
    ...theme.typography.heading1,
    marginTop: 0
  }
}))

const TitleBarNav = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  marginTop: 20
}))

const BodyContent = glamorous.div({
  padding: "32px 16px",
  maxWidth: 760,
  margin: "auto"
})

const customButtonStyles: {} = {
  margin: "0 6px"
}

const customCardHeaderStyles: {} = {
  color: operational.colors.black,
  height: 48,
  padding: "0 20px"
}

const sexyTheme: Theme = {
  ...operational,
  spacing: 12,
  typography: {
    ...operational.typography,
    title: {
      fontWeight: 400,
      textTransform: "none",
      letterSpacing: "normal",
      lineHeight: "1.6",
      fontSize: 36
    },
    heading1: {
      fontWeight: 400,
      textTransform: "none",
      letterSpacing: "normal",
      lineHeight: "1.6",
      fontSize: 18
    },
    body: {
      fontWeight: 400,
      textTransform: "none",
      letterSpacing: "normal",
      lineHeight: "1.6",
      fontSize: 18
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
            <Hero>
              <TitleBarContent>
                <Logo size={86} rotation={this.state.rotation} />
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
            </Hero>
            <StaticContent
              css={{ marginTop: 32 }}
              markdownContent={`\`Operational UI\` is a library made for data-driven decision making. It does its best when used for interfaces that assume familiarity through routine use, prioritizing compactness and subtle hierarchies. 
              
It implements a [design language](https://ui.contiamo.com/docs/design-guidelines) centered around [small effective differences](https://twitter.com/edwardtufte/status/450076034759524352), and prefers [uncomplicated basics]() as much as it loves [elaborate dataviz]().

It is predictable to use, and it lets you and your team breathe. Exhales, not sighs.
              `}
            />
          </Card>
          <Card>
            <CardHeader css={customCardHeaderStyles}>Examples</CardHeader>
            <StaticContent markdownContent="Curious how this was made?" />
            <OperationalUI theme={operational}>
              <div style={{ backgroundColor: "#F5F6FA", padding: 12, borderRadius: 4 }}>
                <div>
                  <Input placeholder="How was I made?" />
                  <Button css={{ marginLeft: 6 }} color="info">
                    This is how!
                  </Button>
                </div>
                <div style={{ marginTop: 6 }}>
                  <Chip icon="X" onIconClick={() => {}}>
                    Tags
                  </Chip>
                  <Chip icon="X" onIconClick={() => {}}>
                    Are
                  </Chip>
                  <Chip icon="X" onIconClick={() => {}}>
                    Nice
                  </Chip>
                </div>
              </div>
            </OperationalUI>
            <StaticContent
              css={{ marginTop: 20 }}
              markdownContent={`
Head to our CodeSandbox demos for [simple interface elements](https://codesandbox.io/embed/zq5nm42x84), a [full-featured UI]() and [ visualizations]().
              `}
            />
          </Card>
          <Card>
            <CardHeader css={customCardHeaderStyles}>Version</CardHeader>
            <a href="https://www.npmjs.com/package/@operational/components">
              <Button css={customButtonStyles} color="info">
                0.1.0-21
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
