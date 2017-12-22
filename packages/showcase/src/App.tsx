import * as React from "react"
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
import glamorous, { ThemeProvider } from "glamorous"
import { css } from "glamor"
import { operational } from "@operational/theme"
import { baseStylesheet, injectStylesheet } from "@operational/utils"

import Documentation from "./pages/Documentation/Documentation"
import Header from "./components/Header/Header"
import Intro from "./pages/Intro"
import ShowcaseSidenav from "./components/ShowcaseSidenav/ShowcaseSidenav"
import Blocks from "./pages/Blocks/Blocks"
import Components from "./pages/Components/Components"
import Visualizations from "./pages/Visualizations/Visualizations"

interface IProps {
  location?: {
    pathname: string
  }
}

const Container = glamorous.div({
  display: "flex",
  "& p": {
    marginTop: 0,
    marginBottom: operational.spacing
  }
})

const Content = glamorous.div({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  backgroundColor: operational.colors.background,
  height: "100vh",
  "& > *": {
    width: "100%"
  }
})

const Layout = (props: IProps) => (
  <ThemeProvider theme={operational}>
    <Container>
      <ShowcaseSidenav pathname={props.location ? props.location.pathname : "/"} />
      <Content>
        <Header note="v0.1.0-5" />
        <Route exact path="/" component={Intro} />
        <Route path="/documentation" component={Documentation} />
        <Route path="/blocks" component={Blocks} />
        <Route path="/components" component={Components} />
        <Route path="/visualizations" component={Visualizations} />
      </Content>
    </Container>
  </ThemeProvider>
)

const LayoutWithRouter = withRouter(Layout)

export default (props: {}) => (
  <Router>
    <LayoutWithRouter />
  </Router>
)

injectStylesheet(baseStylesheet(operational))
