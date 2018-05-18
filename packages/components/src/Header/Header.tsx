import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  className?: string
  css?: Css
  children?: React.ReactNode
}

const Container = glamorous.header(({ theme }: WithTheme): CssStatic => ({
  label: "header",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: theme.colors.white,
  height: theme.box,
  alignItems: "center",
  padding: `0 ${theme.spacing * 1.5}px`,
  boxShadow: theme.shadows.card,
}))

const Header = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Header
