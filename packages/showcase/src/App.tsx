import * as React from "react"
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
import glamorous, { Div, ThemeProvider } from "glamorous"
import { css } from "glamor"
import { contiamoTheme } from "contiamo-ui-components"

import { appFontFace, appFontWeights, getFontSrcString } from "./utils/fonts"

import SideNavigation from "./components/SideNavigation/SideNavigation"
import Header from "./components/Header/Header"

import Intro from "./pages/Intro"
import Documentation from "./pages/Documentation/Documentation"
import UiComponents from "./pages/UiComponents/UiComponents"
import UiBlocks from "./pages/UiBlocks/UiBlocks"
import Visualizations from "./pages/Visualizations/Visualizations"

const Container = glamorous.div({
  display: "flex",
  fontFamily: "'Proxima Nova', sans-serif",
  "& hr": {
    margin: `${contiamoTheme.spacing * 3}px 0 ${contiamoTheme.spacing * 2}px`,
    height: 1,
    border: 0,
    backgroundColor: "rgba(0, 0, 0, 0.14)"
  },
  "& p": {
    marginTop: 0,
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
          <Route path="/documentation" component={Documentation} />
          <Route path="/blocks" component={UiBlocks} />
          <Route path="/components" component={UiComponents} />
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
