import * as React from "react"
import { ThemeProvider } from "glamorous"

import { Theme, operational } from "@operational/theme"

export interface Props {
  theme?: Theme
  children?: React.ReactNode
}

const OperationalUI = (props: Props) => {
  // Only one child is allowed here,
  // see https://reactjs.org/docs/react-api.html#reactchildrenonly
  if (React.Children.count(props.children) > 1) {
    throw new Error(
      "<OperationalUI/> expects a single child inside of it, like React Router's <Router/>. Please remove any additional children. See https://github.com/Contiamo/operational-ui/tree/master/packages/components."
    )
  }
  return <ThemeProvider theme={props.theme || operational}>{props.children}</ThemeProvider>
}

export default OperationalUI
