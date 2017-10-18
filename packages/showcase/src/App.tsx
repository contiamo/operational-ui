import * as React from "react"
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
import glamorous, { Div, ThemeProvider } from "glamorous"
import { css } from "glamor"
import { contiamoTheme } from "contiamo-ui-components"

import { appFontFace, appFontWeights, getFontSrcString } from "./utils/fonts"

import SideNavigation from "./components/SideNavigation/SideNavigation"
import Header from "./components/Header/Header"

import Intro from "./pages/Intro"
import StyleGuide from "./pages/styleguide/StyleGuide"
import Components from "./pages/components/Components"
import Visualizations from "./pages/visualizations/Visualizations"

const Container = glamorous.div({
  display: "flex",
  fontFamily: "'Proxima Nova', sans-serif",
  "& hr": {
    margin: `${contiamoTheme.spacing * 3}px 0 ${contiamoTheme.spacing * 2}px`,
    height: 1,
    border: 0,
    backgroundColor: "rgba(0, 0, 0, 0.14)"
  },
  "& h1": {
    margin: 0,
    fontSize: "2rem"
  },
  "& h2": {
    fontSize: "1.3rem"
  },
  "& p": {
    margin: 0,
    marginBottom: contiamoTheme.spacing
  }
})

const Content = glamorous.div({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  backgroundColor: contiamoTheme.colors.usage.bodyBackground,
  height: "100vh",
  paddingLeft: 60,
  "& > *": {
    width: "100%"
  },
  "& > :nth-child(2)": {
    display: "flex",
    alignItems: "flex-start",
    padding: 16,
    height: "100vh"
  }
})

const SideNavigationWithRouter: React.SFC<{}> = withRouter(SideNavigation as any)

const App: React.SFC<{}> = () => (
  <Router>
    <ThemeProvider theme={contiamoTheme}>
      <Container>
        <SideNavigationWithRouter />
        <Content>
          <Header />
          <Route exact path="/" component={Intro} />
          <Route path="/styleguide" component={StyleGuide} />
          <Route path="/components" component={Components} />
          <Route path="/visualizations" component={Visualizations} />
        </Content>
      </Container>
    </ThemeProvider>
  </Router>
)

// @todo -> type this better
const x = css as any
appFontWeights.forEach((fontWeight: number) => {
  x.fontFace({
    ...appFontFace,
    ...getFontSrcString(fontWeight)()(),
    fontWeight
  })
})
x.global("body", { backgroundColor: contiamoTheme.colors.usage.bodyBackground })
x.global({
  fontSize: 13
})

export default App
