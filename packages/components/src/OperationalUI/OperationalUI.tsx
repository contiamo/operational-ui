import * as React from "react"

/** @todo rename this import once we're fully in emotion */
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming"

/** @todo remove this once we're fully in emotion */
import { ThemeProvider } from "glamorous"

import { Theme, operational, constants } from "@operational/theme"
import { baseStylesheet } from "@operational/utils"

export interface Props {
  /** Theme */
  theme?: Theme
  /** Children */
  children?: React.ReactNode
  /** Use the base styles */
  withBaseStyles?: boolean
  /** Custom push state method expecting a single string */
  pushState?: (path: string) => void
  /** Custom replace state method expecting a single string */
  replaceState?: (path: string) => void
}

const { Provider, Consumer } = React.createContext({})

const OperationalUI = (props: Props) => {
  return (
    <ThemeProvider theme={props.theme || operational}>
      <EmotionThemeProvider theme={constants}>
        <Provider value={{ pushState: props.pushState, replaceState: props.replaceState }}>
          <React.Fragment>
            {props.withBaseStyles ? (
              <style
                dangerouslySetInnerHTML={{
                  __html: baseStylesheet(props.theme || operational),
                }}
              />
            ) : null}
            {props.children}
          </React.Fragment>
        </Provider>
      </EmotionThemeProvider>
    </ThemeProvider>
  )
}

export default OperationalUI
export { Consumer }
