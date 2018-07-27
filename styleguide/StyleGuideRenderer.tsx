import { injectGlobal } from "emotion"
import * as React from "react"
import styled from "../src/utils/styled"

import { HeaderBar, Layout, Logo, OperationalUI, Page } from "../src"
import constants from "../src/utils/constants"
import Splash from "./Splash"

export interface StyleGuideRendererState {
  isSplashVisible: boolean
  activeComponent: string
}

export interface StyleGuideRendererProps {
  children: React.ReactNode[] | React.ReactNode
  toc: React.ReactNode
  hasSidebar: boolean
}

/**
 * We use require here and _not_ import because
 * we don't want Webpack to deal with .json files
 * and include them in the bundle.
 *
 * We just want to require it at node runtime
 * for the version value.
 */
/* tslint:disable:no-var-requires */
const { version } = require("../package.json")

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
  updateActiveComponent: (_: string) => undefined,
})

const Header = () => <HeaderBar logo={<Logo name="OperationalUI" />} end={<Version>v{version}</Version>} />

const IsolatedContainer = styled("div")(({ theme }) => ({ width: 768, margin: `${theme.space.big}px auto 0` }))

class StyleGuideRenderer extends React.Component<StyleGuideRendererProps, Readonly<StyleGuideRendererState>> {
  public readonly state = {
    isSplashVisible: !Boolean(window.location.hash),
    activeComponent: "",
  }

  private hideSplash = () => {
    this.setState({ isSplashVisible: false })
  }

  private updateActiveComponent = (activeComponent: string) => {
    window.history.pushState(null, undefined, `#${activeComponent}`)
    this.setState({ activeComponent })
    return undefined
  }

  public render() {
    const { children, toc, hasSidebar } = this.props
    const { isSplashVisible } = this.state
    return (
      <OperationalUI withBaseStyles>
        {isSplashVisible ? (
          <Splash hide={this.hideSplash} />
        ) : (
          <Provider
            value={{
              activeComponent: this.state.activeComponent,
              updateActiveComponent: this.updateActiveComponent,
            }}
          >
            {hasSidebar ? (
              <Layout header={<Header />} sidenav={toc} main={<Page title="Components">{children}</Page>} />
            ) : (
              <div>
                <Header />
                <IsolatedContainer>{children}</IsolatedContainer>
              </div>
            )}
          </Provider>
        )}
      </OperationalUI>
    )
  }
}

export { Consumer }

export default StyleGuideRenderer
