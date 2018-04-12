import * as React from "react"
import { render } from "react-dom"
import glamorous from "glamorous"
import { Card, Icon, Button, CardHeader, OperationalUI } from "@operational/components"
import { Theme } from "@operational/theme"

import { StaticContent, Animation, Hero, Logo, Footer, Section } from "./components"
import sections from "./Sections"

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

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  maxWidth: 760,
  margin: "auto",
  padding: 2 * theme.spacing
}))

const TitleBarNav = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  marginTop: 20
}))

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
        <Container>
          <Card css={{ overflow: "hidden" }}>
            <Hero>
              <TitleBarContent>
                <Logo size={86} rotation={this.state.rotation} />
                <h1>Operational UI</h1>
                <h2>Building blocks for effective operational interfaces</h2>
                <TitleBarNav>
                  <a href="https://codesandbox.io/s/v84wv1zpq3">
                    <Button color="info">Try</Button>
                  </a>
                  <a href="https://github.com/contiamo/operational-ui">
                    <Button color="black">GitHub</Button>
                  </a>
                </TitleBarNav>
              </TitleBarContent>
            </Hero>
            <StaticContent
              css={{ marginTop: 10, fontSize: 16 }}
              markdownContent={`\`Operational\` is a UI library optimized for day-to-day operational decision-making. It does its best when used for interfaces that assume familiarity through routine use, prioritizing compactness and [small effective differences](https://twitter.com/edwardtufte/status/450076034759524352).
              
It is predictable to use, and it lets you and your team breathe. Exhales, not sighs.
              `}
            />
          </Card>
          <React.Fragment>
            {sections.map(({ title, docsUrl, Component }) => (
              <Section title={title} docsUrl={docsUrl}>
                <Component />
              </Section>
            ))}
          </React.Fragment>
          <Footer />
        </Container>
      </OperationalUI>
    )
  }
}

render(<App />, document.querySelector("#app"))
