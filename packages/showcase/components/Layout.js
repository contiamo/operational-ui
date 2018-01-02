import glamorous, { ThemeProvider } from "glamorous"
import { css, rehydrate } from "glamor"
import { renderStatic } from "glamor/server"
import { operational } from "@operational/theme"
import { baseStylesheet } from "@operational/utils"
import Head from "next/head"

import Header from "../components/Header"
import PageContent from "./PageContent"
import Sidenavigation from "../components/Sidenavigation"
import nextConfig from "../next.config"

let didRehydrate = false

const pathmap = nextConfig.exportPathMap()

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

class Layout extends React.Component {
  render() {
    const { pathname } = this.props
    return (
      <ThemeProvider theme={operational}>
        <Container>
          <Sidenavigation pathname={pathname} pathmap={pathmap} />
          <Content>
            <Header note="v0.1.0-5" pathname={pathname} pathmap={pathmap} />
            <PageContent>{this.props.children}</PageContent>
          </Content>
        </Container>
      </ThemeProvider>
    )
  }

  componentWillMount() {
    if (!didRehydrate && typeof window !== "undefined") {
      rehydrate(window.__NEXT_DATA__.ids)
      didRehydrate = true
    }
  }
}

export default Layout
