import glamorous, { ThemeProvider } from "glamorous"
import { rehydrate } from "glamor"
import { operational } from "@operational/theme"
import { baseStylesheet, darken } from "@operational/utils"
import { OperationalUI, Progress, Spinner } from "@operational/components"
import Router from "next/router"

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
  "& h3": {
    ...theme.typography.heading2
  },
  "& p": {
    ...theme.typography.body,
    maxWidth: 670
  }
}))

let didRenderOnClient = false

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isNavigating: false,
      isClientRendered: didRenderOnClient
    }
  }

  render() {
    const { pathname } = this.props
    return (
      <OperationalUI>
        {!this.state.isClientRendered ? (
          <Spinner css={{ top: "50%", left: "50%", transform: "translate3d(-50%, -50%, 0)", position: "absolute" }} />
        ) : (
          <Container>
            {this.state.isNavigating && <Progress />}
            <Sidenavigation pathname={pathname} pathmap={pathmap} />
            <Content>
              <Header note="v0.1.0-10" pathname={pathname} pathmap={pathmap} />
              <PageContent>{this.props.children}</PageContent>
            </Content>
          </Container>
        )}
      </OperationalUI>
    )
  }

  componentDidMount() {
    didRenderOnClient = true
    rehydrate(window.__NEXT_DATA__.ids)
    this.setState(prevState => ({
      isClientRendered: didRenderOnClient
    }))
    Router.onRouteChangeStart = () => {
      this.setState(prevState => ({
        isNavigating: true
      }))
    }
  }

  componentWillUnmount() {
    Router.onRouteChangeStart = null
  }
}
