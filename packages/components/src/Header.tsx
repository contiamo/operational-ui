import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { readableTextColor } from "@operational/utils"

import { headerHeight } from "./constants"

export interface Props {
  id?: string | number
  className?: string
  css?: {}
  children?: React.ReactNode
}

const Container = glamorous.header(({ theme }: { theme: Theme }): {} => ({
  label: "header",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: theme.colors.white,
  height: headerHeight,
  alignItems: "center",
  padding: `0 ${theme.spacing * 4 / 3}px`,
  boxShadow: theme.shadows.card
}))

const Header = (props: Props) => (
  <Container key={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Header
