import * as React from "react"
import glamorous from "glamorous"

import SidebarItem from "./Item/SidebarItem"
import SidebarLink from "./Link/SidebarLink"

type Props = {
  className?: string
  children: JSX.Element[]
}

const style: {} = ({ theme }: { theme: Theme }) => ({
  width: "100%",
  maxWidth: 280,
  maxHeight: "100%",
  boxShadow: theme.shadows.card,
  overflow: "auto",
  scrollBehavior: "smooth", // future-proof
  fontWeight: 300,
  backgroundColor: theme.colors.usage.cardBackground,
  color: theme.colors.palette.grey80,
})

const Sidebar: React.SFC<Props> = ({ className, children }: Props) => <div className={className}>{children}</div>

export default glamorous(Sidebar)(style)
export { Sidebar, SidebarItem, SidebarLink }
