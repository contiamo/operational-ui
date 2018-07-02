import * as React from "react"
import { injectGlobal } from "emotion"
import { ThemeProvider } from "emotion-theming"

import constants, { OperationalStyleConstants } from "../utils/constants"
import { darken } from "@operational/utils"

export interface Props {
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

const baseStylesheet = (theme: OperationalStyleConstants): string => `
* {
  box-sizing: border-box;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: ${theme.deprecated.fontFamily};
  font-size: 13px;
  height: 100%;
}

body {
  background-color: ${theme.deprecated.colors.background};
}

a:link,
a:visited {
  color: ${theme.deprecated.colors.info};
  text-decoration: none;
}

a:hover: {
  color: ${darken(theme.deprecated.colors.info, 5)};
}
`

class OperationalUI extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.withBaseStyles && injectGlobal(baseStylesheet(constants))
  }

  render() {
    const { withBaseStyles, pushState, replaceState, children } = this.props
    return (
      <ThemeProvider theme={constants}>
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
}

export default OperationalUI

export { Consumer }
