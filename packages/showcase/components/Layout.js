import glamorous, { ThemeProvider } from "glamorous"
import { css } from "glamor"
import { operational } from "@operational/theme"
import { baseStylesheet } from "@operational/utils"
import Head from "next/head"

import Header from "../components/Header"
import PageContent from "./PageContent"
import Sidenavigation from "../components/Sidenavigation"
import nextConfig from "../next.config"

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
          <Head>
            <style>{baseStylesheet(operational)}</style>
            <title>Operational UI</title>
            <meta name="description" value="Building blocks for effective operational interfaces" />
            <meta name="keywords" value="UI, design systems, React, components, operational" />
            <meta name="viewport" content="user-scalable=1, width=device-width, initial-scale=1" />
            <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css" />
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/mbo.min.css" />
            <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
            <link rel="manifest" href="/favicons/manifest.json" />
            <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.js" />
            <script
              type="text/javascript"
              src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/mode/javascript/javascript.min.js"
            />
          </Head>
          <Sidenavigation pathname={pathname} pathmap={pathmap} />
          <Content>
            <Header note="v0.1.0-5" pathname={pathname} pathmap={pathmap} />
            <PageContent>{this.props.children}</PageContent>
          </Content>
        </Container>
      </ThemeProvider>
    )
  }
}

export default Layout
