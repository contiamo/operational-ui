import * as React from "react"
import glamorous, { Div } from "glamorous"

import { WithTheme, Css } from "./types"

export interface Props {
  css?: Css
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  index?: number
  title?: string
}

const Tab = (props: Props) => (
  <Div css={props.css} className={props.className}>
    {props.children}
  </Div>
)

export default Tab
