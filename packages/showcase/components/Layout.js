import glamorous, { ThemeProvider } from "glamorous"
import { rehydrate } from "glamor"
import { operational } from "@operational/theme"
import { baseStylesheet, darken } from "@operational/utils"
import { OperationalUI } from "@operational/components"

import Header from "../components/Header"
import Sidenavigation from "../components/Sidenavigation"
import nextConfig from "../next.config"

const pathmap = nextConfig.exportPathMap()

const Container = glamorous.div({
  label: "showcaselayout",
  display: "flex",
  "& p": {
    marginTop: 0,
    marginBottom: operational.spacing
  }
})

const Content = glamorous.div({
  display: "flex",
  flexDirection: "column",
  width: "calc(100vw - 240px)",
  backgroundColor: operational.colors.background,
  height: "100vh",
  "& > *": {
    width: "100%"
  }
})

const PageContent = glamorous.div(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flex: "1",
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
  "& h2": {
    ...theme.typography.heading2
  },
  "& p": {
    maxWidth: 670
  }
}))

export default class Layout extends React.Component {
  render() {
    const { pathname } = this.props
    return (
      <OperationalUI>
        <Container>
          <Sidenavigation pathname={pathname} pathmap={pathmap} />
          <Content>
            <Header note="v0.1.0-9" pathname={pathname} pathmap={pathmap} />
            <PageContent>{this.props.children}</PageContent>
          </Content>
        </Container>
      </OperationalUI>
    )
  }

  componentDidMount() {
    rehydrate(window.__NEXT_DATA__.ids)
  }
}
