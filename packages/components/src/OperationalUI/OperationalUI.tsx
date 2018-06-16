import * as React from "react"
import { injectGlobal } from "emotion"
import { ThemeProvider } from "emotion-theming"
/** @todo remove this once we're fully in emotion */

import { ThemeProvider as DeprecatedThemeProvider } from "glamorous"
import { OperationalStyleConstants, Theme, operational, constants } from "@operational/theme"
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
  const { withBaseStyles, pushState, replaceState, children, theme } = props
  withBaseStyles && injectGlobal(baseStylesheet(theme || operational))
  return (
    <ThemeProvider
      theme={{
        ...constants,
        deprecated: operational,
      }}
    >
      <Provider
        value={{
          pushState,
          replaceState,
        }}
      >
        {children}
      </Provider>
    </ThemeProvider>
  )
}

export default OperationalUI
export { Consumer }
