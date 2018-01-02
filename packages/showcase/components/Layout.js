import glamorous, { ThemeProvider } from "glamorous"
import { css, rehydrate } from "glamor"
import { renderStatic } from "glamor/server"
import { operational } from "@operational/theme"
import { baseStylesheet, darken } from "@operational/utils"

import Header from "../components/Header"
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

const PageContent = glamorous.div(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  padding: 16,
  height: "100vh",
  display: "flex",
  alignItems: "flex-start",
  flexBasis: "100%",
  height: "100%",
  maxHeight: "100%",
  "& > *": {
    overflow: "auto",
    width: "100%",
    height: "100%"
  },
  "& a:link, & a:visited": {
    color: theme.colors.info
  },
  "& a:hover": {
    color: darken(theme.colors.info)(5)
  },
  "& p": {
    maxWidth: 670
  }
}))

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
