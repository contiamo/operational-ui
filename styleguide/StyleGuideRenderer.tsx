import { css, Global } from "@emotion/core"
import * as React from "react"
import styled from "../src/utils/styled"

import { Button, HeaderBar, Layout, Logo, OperationalUI, Page, Splash } from "../src"
import constants from "../src/utils/constants"

export interface StyleGuideRendererState {
  isSplashVisible: boolean
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

const Version = styled("div")`
  font-size: 16px;
  font-weight: bold;
  margin-right: ${constants.space.content}px;
`

const Header = () => <HeaderBar logo={<Logo name="OperationalUI" />} end={<Version>v{version}</Version>} />

class StyleGuideRenderer extends React.Component<StyleGuideRendererProps, Readonly<StyleGuideRendererState>> {
  public readonly state = {
    isSplashVisible: !Boolean(window.location.hash),
  }

  public render() {
    const { children, toc, hasSidebar } = this.props
    const { isSplashVisible } = this.state
    return (
      <OperationalUI>
        <Global
          styles={css`
            #rsg-root {
              height: 100vh;
            }

            // buttons style override
            [class^="rsg--controls-"] {
              margin-top: 16px;
            }

            .rsg--spacing-7 {
              margin: 0;
            }

            .rsg--tab-14: {
              margintop: constants.space.content;
            }
          `}
        />

        {isSplashVisible ? (
          <Splash
            color="#005f96"
            title="Operational UI"
            actions={
              <>
                <Button
                  onClick={() => {
                    this.setState(() => ({
                      isSplashVisible: false,
                    }))
                  }}
                >
                  Docs
                </Button>
                <Button to="https://github.com/contiamo/operational-ui/">GitHub</Button>
              </>
            }
          >
            <p>
              Operational is a UI library optimized for day-to-day operational decision-making. It does its best when
              used for interfaces that assume familiarity through routine use, prioritizing compactness and{" "}
              {
                <a href="https://twitter.com/edwardtufte/status/450076034759524352" target="_blank">
                  small effective differences
                </a>
              }
              .
            </p>
            <p>It is predictable to use, and it lets you and your team breathe. Exhales, not sighs.</p>
          </Splash>
        ) : hasSidebar ? (
          <Layout header={<Header />} sidenav={toc} main={<Page title="Components">{children}</Page>} />
        ) : (
          <>
            <Header />
            <Page fill>{children}</Page>
          </>
        )}
      </OperationalUI>
    )
  }
}

export default StyleGuideRenderer
