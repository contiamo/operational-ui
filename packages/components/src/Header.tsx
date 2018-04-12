import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { readableTextColor } from "@operational/utils"

export interface Props {
  id?: string
  className?: string
  css?: {}
  children?: React.ReactNode
}

const Container = glamorous.header(({ theme }: { theme: Theme }): {} => ({
  label: "header",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: theme.colors.white,
  height: theme.unit,
  alignItems: "center",
  padding: `0 ${theme.spacing * 1.25}px`,
  boxShadow: theme.shadows.card
}))

const Header = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Header
