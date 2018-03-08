import glamorous, { ThemeProvider } from "glamorous"
import { rehydrate } from "glamor"
import { operational } from "@operational/theme"
import { baseStylesheet, darken } from "@operational/utils"
import { OperationalUI, Spinner, Layout as OpLayout } from "@operational/components"
import Router from "next/router"

import Header from "../components/Header"
import Sidenavigation from "../components/Sidenavigation"
import nextConfig from "../next.config"

const pathmap = nextConfig.exportPathMap()

const PageContent = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  display: "grid",
  gridTemplateColumns: "auto 400px",
  gridTemplateRows: "auto auto",
  gridColumnGap: theme.spacing,
  gridRowGap: theme.spacing,
  "& > *": {
    height: "100%",
    overflow: "auto"
  "& h2": {
    ...theme.typography.heading1
  },
  "& h3": {
    ...theme.typography.heading2,
    color: "#888"
  },
  "& p, & li": {
    ...theme.typography.body,
    lineHeight: 1.6,
    maxWidth: 670
  },
  "& p": {
    marginTop: 0,
    marginBottom: operational.spacing
  },
  "& ul": {
    paddingLeft: theme.spacing * 1.25
  },
  "& code": {
    backgroundColor: "#eee",
    padding: "2px 4px",
    borderRadius: 2
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
      <OperationalUI withBaseStyles>
        {!this.state.isClientRendered ? (
          <Spinner css={{ top: "50%", left: "50%", transform: "translate3d(-50%, -50%, 0)", position: "absolute" }} />
        ) : (
          <OpLayout
            css={{ gridTemplateColumns: "240px auto", overflow: "hidden", height: "100vh" }}
            loading={this.state.isNavigating}
          >
            <Sidenavigation pathname={pathname} pathmap={pathmap} />
            <Header note="v0.1.0-18" pathname={pathname} pathmap={pathmap} />
            <PageContent>{this.props.children}</PageContent>
          </OpLayout>
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
