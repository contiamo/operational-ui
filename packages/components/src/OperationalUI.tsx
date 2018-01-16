import * as React from "react"
import { ThemeProvider } from "glamorous"

import { Theme, operational } from "@operational/theme"

export interface IProps {
  theme?: Theme
  children?: React.ReactNode
}

export default (props: IProps) => (
  // Only one child is allowed here,
  // see https://reactjs.org/docs/react-api.html#reactchildrenonly
  <ThemeProvider theme={props.theme || operational}>{React.Children.only(props.children)}</ThemeProvider>
)
