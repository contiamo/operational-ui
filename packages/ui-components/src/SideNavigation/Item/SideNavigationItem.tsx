import * as React from "react"
import { SFC } from "react"
import Theme from "types/theme"
import glamorous from "glamorous"

import withTooltip from "../../Tooltip/withTooltip"

type Props = {
  className: string
  children: Node
  onClick?: () => void
  theme: Theme
  active?: boolean
}

const SideNavigationItem: SFC<Props> = ({ className, children, onClick }: Props) =>
    <div className={`${className} SideNavigationItem`} onClick={onClick} role="button" tabIndex={-1}>
      {children}
    </div>,
  style = ({ theme, active }: Props): {} => {
    const activeBackgroundColor = "rgba(0, 0, 0, 0.2)"
    return {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: `${theme.spacing / 2}px ${theme.spacing * 1.7}px`,
      borderRadius: 2,
      width: "100%",
      minHeight: 40,
      cursor: "pointer",
      backgroundColor: active ? activeBackgroundColor : "transparent",

      ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.07)",
      },

      "&.SideNavigationItem_active": {
        backgroundColor: activeBackgroundColor,
      },

      ":first-child": {
        marginTop: 0,
        marginBottom: theme.spacing ? theme.spacing * 2 : 16,
      },
    }
  }

export default glamorous(withTooltip(SideNavigationItem))(style)
