// @flow
import React from "react"
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
import glamorous, { Div, ThemeProvider } from "glamorous"
import { css } from "glamor"

import { appFontFace, appFontWeights, getFontSrcString } from "./utils/fonts"

import SideNavigation from "./components/SideNavigation/SideNavigation"
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import AppCanvas from "./components/Canvas/Canvas"

import ButtonsPage from "./pages/Buttons/Buttons"
import FormFieldsPage from "./pages/FormFields/FormFields"
import CardsPage from "./pages/Cards/Cards"
import ChipsPage from "./pages/Chips/Chips"
import TooltipsPage from "./pages/Tooltips/Tooltips"
import StatsPage from "./pages/Stats/Stats"
import SidebarPage from "./pages/Sidebar/Sidebar"

import DEFAULT_THEME from "../theme"

const SidebarWithRouter = withRouter(Sidebar),
  App = ({ className }: { className: string }) =>
    <Router>
      <ThemeProvider theme={DEFAULT_THEME}>
        <div className={className}>
          <SideNavigation />
          <Div
            css={{
              display: "flex",
              flexDirection: "column",
              width: "100vw",
              height: "100vh"
            }}
          >
            <Header />
            <Div
              css={{
                display: "flex",
                padding: 16,
                width: "100%",
                height: "100vh"
              }}
            >
              <SidebarWithRouter />
              <AppCanvas css={{ marginLeft: 16, flexBasis: "100%" }}>
                <Route path="/buttons" component={ButtonsPage} />
                <Route path="/form-fields" component={FormFieldsPage} />
                <Route path="/cards" component={CardsPage} />
                <Route path="/chips" component={ChipsPage} />
                <Route path="/tooltips" component={TooltipsPage} />
                <Route path="/stats" component={StatsPage} />
                <Route path="/sidebar" component={SidebarPage} />
                <Route
                  path="/demo"
                  render={() =>
                    <img style={{ maxWidth: "175%" }} src="/screen.png" />}
                />
              </AppCanvas>
            </Div>
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
