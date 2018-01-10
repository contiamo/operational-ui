import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

import SidebarItem from "./SidebarItem"
import SidebarLink from "./SidebarLink"

export interface IProps {
  id?: string | number
  css?: any
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  label: "sidebar",
  width: "100%",
  maxWidth: 280,
  maxHeight: "100%",
  boxShadow: theme.shadows.card,
  overflow: "auto",
  scrollBehavior: "smooth", // future-proof
  backgroundColor: theme.colors.cardBackground,
  color: theme.colors.gray80
}))

const Sidebar: React.SFC<IProps> = (props: IProps) => (
  <Container key={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Sidebar
export { Sidebar, SidebarItem, SidebarLink }
