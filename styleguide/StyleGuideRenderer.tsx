import { injectGlobal } from "emotion"
import * as React from "react"
import styled from "react-emotion"

import { HeaderBar, Layout, Logo, OperationalUI, Page } from "../src"
import constants from "../src/utils/constants"
import Splash from "./Splash"

export interface StyleGuideRendererState {
  isSplashVisible: boolean
  activeComponent: string
}

export interface StyleGuideRendererProps {
  title: string
  children: React.ReactNode[] | React.ReactNode
  toc: React.ReactNode
  hasSidebar: boolean
}

injectGlobal({
  "#rsg-root": {
    height: "100vh",
  },
  ".rsg--controls-12": {
    marginTop: constants.space.content,
  },
  ".rsg--spacing-7": {
    margin: 0,
  },
  ".rsg--tab-14": {
    marginTop: constants.space.content,
  },
})

const Version = styled("div")`
  font-size: 16px;
  font-weight: bold;
  margin-right: ${constants.space.content}px;
`

const { Provider, Consumer } = React.createContext({
  activeComponent: "",
  updateActiveComponent: (componentName: string) => void 0,
})

class StyleGuideRenderer extends React.Component<StyleGuideRendererProps, Readonly<StyleGuideRendererState>> {
  public readonly state = {
    isSplashVisible: !Boolean(window.location.hash),
    activeComponent: "",
  }

  private hideSplash = () => {
    this.setState({ isSplashVisible: false })
  }

  private updateActiveComponent = (activeComponent: string) => {
    window.history.pushState(null, null, `#${activeComponent}`)
    this.setState({ activeComponent })
  }

  public render() {
    const { title, children, toc, hasSidebar } = this.props
    const { isSplashVisible } = this.state
    return (
      <OperationalUI withBaseStyles>
        {isSplashVisible && <Splash hide={this.hideSplash} />}
        <Provider
          value={{
            activeComponent: this.state.activeComponent,
            updateActiveComponent: this.updateActiveComponent,
          }}
        >
          {hasSidebar ? (
            <Layout
              header={
                <HeaderBar
                  logo={<Logo name="OperationalUI" />}
                  end={<Version>v{require("../package.json").version}</Version>}
                />
              }
              sidenav={toc}
              main={<Page title={title}>{children}</Page>}
            />
          ) : (
            <div>
              <HeaderBar
                logo={<Logo name="OperationalUI" />}
                end={<Version>v{require("../package.json").version}</Version>}
              />
              <div style={{ width: 768, margin: `${constants.space.big}px auto 0` }}>{children}</div>
            </div>
          )}
        </Provider>
      </OperationalUI>
    )
  }
}

export { Consumer }

export default StyleGuideRenderer
