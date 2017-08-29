import React from "react"
import glamorous from "glamorous"

const SideNavigationHeader = ({
  className,
  children
}: {
  className: string,
  children: any,
}) =>
  <div className={className}>
    {children}
  </div>

const style = ({ theme }: { theme: THEME }) => ({
  width: "100%",
  borderBottom: "1px solid rgba(255, 255, 255, .1)",
  padding: theme.spacing ? theme.spacing : 16
})

export default glamorous(SideNavigationHeader)(style)
export { SideNavigationHeader }
