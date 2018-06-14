import * as React from "react"
import { ThemeProvider } from "glamorous"

/** @todo
 * remove operational when constants are in
 * place and operational is no longer themable
 * https://trello.com/c/06WFxrhp
 */
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
  const styles = { ...operational, constants }
  return (
    <ThemeProvider theme={styles}>
      <Provider value={{ pushState: props.pushState, replaceState: props.replaceState }}>
        <>
          {props.withBaseStyles && (
            <style
              dangerouslySetInnerHTML={{
                __html: baseStylesheet(props.theme || operational),
              }}
            />
          )}
          {props.children}
        </>
      </Provider>
    </ThemeProvider>
  )
}

export default OperationalUI
export { Consumer }
