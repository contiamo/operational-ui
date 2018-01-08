import * as React from "react"
import { ThemeProvider } from "glamorous"

import { Theme, operational } from "@operational/theme"

export interface IProps {
  theme?: Theme
  children?: React.ReactNode
}

export default (props: IProps) => <ThemeProvider theme={props.theme || operational}>{props.children}</ThemeProvider>
