import { injectGlobal } from "emotion"
import * as React from "react"

import { HeaderBar, Layout, Logo, OperationalUI, Page } from "../src"
import Splash from "./Splash"

export interface StyleGuideRendererState {
  isSplashVisible: boolean
}

export interface StyleGuideRendererProps {
  title: string
  children: React.ReactNode[] | React.ReactNode
  toc: React.ReactNode
}

injectGlobal({
  "#rsg-root": {
    height: "100vh",
  },
  ".rsg--controls-12": {
    marginTop: 16,
  },
  ".rsg--spacing-7": {
    margin: 0,
  },
})

class StyleGuideRenderer extends React.Component<StyleGuideRendererProps, Readonly<StyleGuideRendererState>> {
  public readonly state = {
    isSplashVisible: true,
  }

  public hideSplash = () => {
    this.setState({ isSplashVisible: false })
  }

  public render() {
    const { title, children, toc } = this.props
    const { isSplashVisible } = this.state
    return (
      <OperationalUI withBaseStyles>
        {isSplashVisible && <Splash hide={this.hideSplash} />}
        <Layout
          header={<HeaderBar logo={<Logo name="Contiamo" />} />}
          sidenav={toc}
          main={<Page title={title}>{children}</Page>}
        />
      </OperationalUI>
    )
  }
}

export default StyleGuideRenderer
