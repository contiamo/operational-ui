import * as React from "react"
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
import glamorous, { Div, ThemeProvider } from "glamorous"
import { css } from "glamor"
import { contiamoTheme } from "contiamo-ui-components"

import { appFontFace, appFontWeights, getFontSrcString } from "./utils/fonts"

import SideNavigation from "./components/SideNavigation/SideNavigation"
import Header from "./components/Header/Header"

import IntroPage from "./pages/Intro"
import ComponentsPage from "./pages/components/Components"
import VisualizationsPage from "./pages/visualizations/Visualizations"

type Props = { className?: string }

const SideNavigationWithRouter = withRouter(SideNavigation),
  App = ({ className }: Props) => (
    <Router>
      <ThemeProvider theme={contiamoTheme}>
        <div className={className}>
          <SideNavigationWithRouter />
          <Div className="app">
            <Header />
            <Route exact path="/" component={IntroPage} />
            <Route path="/components" component={ComponentsPage} />
            <Route path="/visualizations" component={VisualizationsPage} />
          </Div>
        </div>
      </ThemeProvider>
    </Router>
  ),
  styles: {} = {
    display: "flex",
    ...contiamoTheme.fonts,
    backgroundColor: contiamoTheme.greys["20"],
    "& hr": {
      margin: `${contiamoTheme.spacing * 3}px 0 ${contiamoTheme.spacing * 2}px`,
      height: 1,
      border: 0,
      backgroundColor: "rgba(0, 0, 0, 0.14)",
    },
    "& .app": {
      display: "flex",
      flexDirection: "column",
      width: "100vw",
      height: "100vh",
      marginLeft: 60,
    },
    "& h1": {
      margin: 0,
      fontSize: "2rem",
    },
    "& h2": {
      fontSize: "1.3rem",
    },
    "& p": {
      margin: 0,
      marginBottom: 16,
    },
  }

// @todo -> type this better
const x = css as any
appFontWeights.forEach((fontWeight: number) => {
  x.fontFace({
    ...appFontFace,
    ...getFontSrcString(fontWeight)()(),
    fontWeight,
  })
})

x.global({ fontSize: 13 })

export default glamorous(App)(styles)
