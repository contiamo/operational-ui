import * as React from "react"
import glamorous from "glamorous"

import SidebarItem from "./Item/SidebarItem"
import SidebarLink from "./Link/SidebarLink"

type Props = {
  className?: string
  children: JSX.Element[]
}

const Sidebar: React.SFC<Props> = ({ className, children }: Props) =>
    <div className={className}>
      {children}
    </div>,
  style: {} = ({ theme }: { theme: Theme }) => ({
    width: "100%",
    maxWidth: 280,
    maxHeight: "100%",
    borderRadius: 2,
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    overflow: "auto",
    scrollBehavior: "smooth", // future-proof
    fontWeight: 300,
    backgroundColor: theme.greys && theme.greys.white,
    color: theme.greys ? theme.greys["80"] : "#747474",
  })

export default glamorous(Sidebar)(style)
export { Sidebar, SidebarItem, SidebarLink }
