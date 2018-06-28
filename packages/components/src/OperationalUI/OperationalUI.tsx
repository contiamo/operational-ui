import * as React from "react"
import { injectGlobal } from "emotion"
import { ThemeProvider } from "emotion-theming"

import constants from "../utils/constants"
import { baseStylesheet } from "@operational/utils"

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

class OperationalUI extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.withBaseStyles && injectGlobal(baseStylesheet(constants.deprecated))
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
