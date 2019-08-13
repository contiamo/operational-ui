import { css, Global } from "@emotion/core"
import React, { Suspense, useReducer } from "react"

import { Layout, OperationalUI, Page, Spinner } from "../src"
import Header from "./Header"

import constants from "../src/utils/constants"
import { styleguideReducer, initialState } from "./styleguideReducer"
import { StyleguideContext } from "./StyleguideContext"

const IFrame = React.lazy(() => import("./IFrame"))

export interface StyleGuideRendererProps {
  children: React.ReactNode[] | React.ReactNode
  toc: React.ReactNode
  hasSidebar: boolean
  version: string
}

const StyleGuideRenderer: React.FC<StyleGuideRendererProps> = ({ children, toc, hasSidebar, version }) => {
  const [state, dispatch] = useReducer(styleguideReducer, initialState)

  return (
    <StyleguideContext.Provider value={[state, dispatch]}>
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

            .rsg--tab-14 {
              margin-top: ${constants.space.content}px;
            }
          `}
        />
        <div
          style={{ display: "grid", gridTemplateColumns: state.isDiffWithMaster ? "1fr 1fr" : "100%", width: "100%" }}
        >
          <div>
            {hasSidebar ? (
              <Layout header={<Header version={version} />} sidenav={toc} main={children} />
            ) : (
              <>
                <Header version={version} />
                <Page fill key={String(state.isDiffWithMaster)}>
                  {children}
                </Page>
              </>
            )}
          </div>
          <Suspense fallback={<Spinner />}>{state.isDiffWithMaster && <IFrame src={state.iFrameUrl} />}</Suspense>
        </div>
      </OperationalUI>
    </StyleguideContext.Provider>
  )
}

export default StyleGuideRenderer
