import * as React from "react"
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
import glamorous, { Div, ThemeProvider } from "glamorous"
import { css } from "glamor"
import { contiamoTheme } from "contiamo-ui-components"

import { appFontFace, appFontWeights, getFontSrcString } from "./utils/fonts"

import SideNavigation from "./components/SideNavigation/SideNavigation"
import Header from "./components/Header/Header"

import IntroPage from "./pages/Intro"
import ComponentsPage from "./pages/Components"

const Container = glamorous.div({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  backgroundColor: contiamoTheme.colors.usage.bodyBackground,
  height: "100vh",
  marginLeft: 60
})

const styles: {} = {
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
  },
}

const SideNavigationWithRouter = withRouter(SideNavigation)

const App = () => (
  <Router>
    <ThemeProvider theme={contiamoTheme}>
      <div>
        <SideNavigationWithRouter />
        <Container>
          <Header />
          <Route exact path="/" component={IntroPage} />
          <Route path="/components" component={ComponentsPage} />
        </Container>
      </div>
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

export default glamorous(App)(styles)
