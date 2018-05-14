import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

import { WithTheme, Css, CssStatic } from "./types"

export interface Props {
  id?: string
  css?: Css
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  label: "buttongroup",
  "& > button": {
    margin: 0,
  },
  "& > button:not(:first-child)": {
    borderLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  "& > button:not(:last-child)": {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
}))

const ButtonGroup = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default ButtonGroup
