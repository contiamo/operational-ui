import { css, Global } from "@emotion/core"
import React, { useState } from "react"
import styled from "../src/utils/styled"

import { Button, HeaderBar, Layout, Logo, OperationalUI, Page, Splash } from "../src"
import constants from "../src/utils/constants"

export interface StyleGuideRendererProps {
  children: React.ReactNode[] | React.ReactNode
  toc: React.ReactNode
  hasSidebar: boolean
  version: string
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

const Version = styled("div")`
  font-size: 16px;
  font-weight: bold;
  margin-right: ${constants.space.content}px;
`

const Header = ({ version }: { version: string }) => (
  <HeaderBar logo={<Logo name="OperationalUI" />} end={<Version>v{version}</Version>} />
)

const SplashScreen = ({ setSplash }: { setSplash: React.Dispatch<React.SetStateAction<boolean>> }) => (
  <Splash
    color="#005f96"
    title="Operational UI"
    actions={
      <>
        <Button
          onClick={() => {
            setSplash(false)
          }}
        >
          Docs
        </Button>
        <Button to="https://github.com/contiamo/operational-ui/">GitHub</Button>
      </>
    }
  >
    <p>
      Operational is a UI library optimized for day-to-day operational decision-making. It does its best when used for
      interfaces that assume familiarity through routine use, prioritizing compactness and{" "}
      {
        <a href="https://twitter.com/edwardtufte/status/450076034759524352" target="_blank">
          small effective differences
        </a>
      }
      .
    </p>
    <p>It is predictable to use, and it lets you and your team breathe. Exhales, not sighs.</p>
  </Splash>
)

function StyleGuideRenderer({ children, toc, hasSidebar, version }: StyleGuideRendererProps) {
  const [isSplashVisible, setSplash] = useState(() => !Boolean(window.location.hash))

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
        <SplashScreen setSplash={setSplash} />
      ) : hasSidebar ? (
        <Layout header={<Header version={version} />} sidenav={toc} main={<Page title="Components">{children}</Page>} />
      ) : (
        <>
          <Header version={version} />
          <Page fill>{children}</Page>
        </>
      )}
    </OperationalUI>
  )
}

export default StyleGuideRenderer
