import * as React from "react"
import { render } from "react-dom"
import glamorous, { Hr, CSSProperties } from "glamorous"
import { Card, Icon, Button, ButtonGroup, CardHeader, OperationalUI, Input } from "@operational/components"
import { operational, Theme } from "@operational/theme"

import { StaticContent, Animation, Hero, Logo, Footer, Section } from "./components"
import componentsSections from "./Sections/Components"
import visualizationsSections from "./Sections/Visualizations"

export interface State {
  rotation: number
  page: "components" | "visualizations"
  search: string
}

export interface SectionData {
  title: string
  docsUrl: string
  snippetUrl: string
  Component: React.SFC<{}>
}

const TitleBarContent = glamorous.div(
  ({ theme }: { theme: Theme }): {} => ({
    label: "showcasetitlebarcontent",
    textAlign: "center",
    position: "relative",
    "& svg": {
      margin: "auto",
    },
    "& h1": {
      ...theme.typography.title,
      margin: "10px 0 0 0",
    },
    "& h2": {
      ...theme.typography.heading1,
      marginTop: 0,
    },
  }),
)

const Separator = glamorous.hr(
  ({ theme }: { theme: Theme }): {} => ({
    margin: `${theme.spacing * 2.5}px auto`,
    width: 80,
    opacity: 0.7,
  }),
)

const Container = glamorous.div(
  ({ theme }: { theme: Theme }): {} => ({
    maxWidth: 760,
    margin: "auto",
    padding: 2.5 * theme.spacing,
  }),
)

const TitleBarNav = glamorous.div(
  ({ theme }: { theme: Theme }): {} => ({
    marginTop: 20,
  }),
)

export default class App extends React.Component<{}, State> {
  state: State = {
    rotation: 0,
    page: "components",
    search: "",
  }

  rotationInterval: any

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({ rotation: 360 }))
      this.rotationInterval = setInterval(
        () => this.setState(() => ({ rotation: this.state.rotation === 0 ? 360 : 0 })),
        10000,
      )
    }, 5000)
  }

  componentWillUnmount() {
    this.rotationInterval && clearInterval(this.rotationInterval)
  }

  render() {
    const sections: SectionData[] =
      this.state.page === "components"
        ? (componentsSections as SectionData[])
        : (visualizationsSections as SectionData[])
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
          <Separator />
          <ButtonGroup
            css={({ theme }: { theme: Theme }) => ({
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
              textAlign: "center",
            })}
          >
            <Button
              css={{ ":focus": { boxShadow: "none" } }}
              color={this.state.page === "components" ? "info" : "white"}
              onClick={() => {
                this.setState(() => ({ page: "components" }))
              }}
            >
              Components
            </Button>
            <Button
              css={{ ":focus": { boxShadow: "none" } }}
              color={this.state.page === "visualizations" ? "info" : "white"}
              onClick={() => {
                this.setState(() => ({ page: "visualizations" }))
              }}
            >
              Visualizations
            </Button>
          </ButtonGroup>
          <Input
            value={this.state.search}
            onChange={(search: string) => {
              this.setState(() => ({ search }))
            }}
            css={{ marginTop: operational.spacing * 1.5, width: "100%" }}
            placeholder={`Search ${this.state.page}`}
          />
          <>
            {sections
              .filter(
                ({ title, docsUrl }) =>
                  title.toLowerCase().match(new RegExp(this.state.search)) ||
                  docsUrl.toLowerCase().match(new RegExp(this.state.search)),
              )
              .sort(({ title: title1 }, { title: title2 }) => (title1 < title2 ? -1 : title1 === title2 ? 0 : 1))
              .map(({ title, docsUrl, snippetUrl, Component }, index: number) => (
                <Section key={index} title={title} docsUrl={docsUrl} snippetUrl={snippetUrl}>
                  <Component />
                </Section>
              ))}
          </>
          <Footer />
        </Container>
      </OperationalUI>
    )
  }
}

render(<App />, document.querySelector("#app"))
