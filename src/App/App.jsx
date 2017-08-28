// @flow
import React from "react"
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
import glamorous, { Div, ThemeProvider } from "glamorous"
import { css } from "glamor"

import { appFontFace, appFontWeights, getFontSrcString } from "./utils/fonts"

import SideNavigation from "./components/SideNavigation/SideNavigation"
import Header from "./components/Header/Header"

import IntroPage from "./pages/Intro"
import ComponentsPage from "./pages/Components"

import DEFAULT_THEME from "../theme"

const SideNavigationWithRouter = withRouter(SideNavigation),
  App = ({ className }: { className: string }) =>
    <Router>
      <ThemeProvider theme={DEFAULT_THEME}>
        <div className={className}>
          <SideNavigationWithRouter />
          <Div className="app">
            <Header />
            <Route exact path="/" component={IntroPage} />
            <Route path="/components" component={ComponentsPage} />
          </Div>
        </div>
      </ThemeProvider>
    </Router>,
  styles: {} = {
    display: "flex",
    backgroundColor: DEFAULT_THEME.greys["10"],
    ...DEFAULT_THEME.fonts,
    "& hr": {
      margin: `${DEFAULT_THEME.spacing * 3}px 0 ${DEFAULT_THEME.spacing * 2}px`,
      height: 1,
      border: 0,
      backgroundColor: "rgba(0, 0, 0, 0.14)"
    },
    "& .app": {
      display: "flex",
      flexDirection: "column",
      width: "100vw",
      height: "100vh",
      marginLeft: 64
    }
  }

appFontWeights.forEach((fontWeight: number) => {
  css.fontFace({
    ...appFontFace,
    ...getFontSrcString(fontWeight)()(),
    fontWeight
  })
})

export default glamorous(App)(styles)
