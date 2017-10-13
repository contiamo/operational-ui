import * as React from "react"
import glamorous from "glamorous"

import SidebarItem from "./Item/SidebarItem"
import SidebarLink from "./Link/SidebarLink"

interface IProps {
  style?: any
  className?: string
  children: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  width: "100%",
  maxWidth: 280,
  maxHeight: "100%",
  boxShadow: theme.shadows.card,
  overflow: "auto",
  scrollBehavior: "smooth", // future-proof
  fontWeight: 300,
  backgroundColor: theme.colors.usage.cardBackground,
  color: theme.colors.palette.grey80
}))

const Sidebar: React.SFC<IProps> = ({ style, className, children }: IProps) => (
  <Container style={style} className={className}>
    {children}
  </Container>
)

export default Sidebar
export { Sidebar, SidebarItem, SidebarLink }
