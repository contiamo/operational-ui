import * as React from "react"
import { ThemeProvider } from "glamorous"

import { Theme, operational } from "@operational/theme"
import { baseStylesheet } from "@operational/utils"

import { Context } from "../types"

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
    </ThemeProvider>
  )
}

export default OperationalUI
export { Consumer }
