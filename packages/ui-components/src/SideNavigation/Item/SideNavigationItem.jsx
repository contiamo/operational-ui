// @flow
import React from "react"
import type { Node } from "react"
import glamorous from "glamorous"

import withTooltip from "../../Tooltip/withTooltip"

type Props = {
  className: string,
  children: Node,
  onClick?: void,
  theme: THEME,
}

const SideNavigationItem = ({ className, children, onClick }: Props): Node =>
    <div className={`${className} SideNavigationItem`} onClick={onClick} role="button" tabIndex="-1">
      {children}
    </div>,
  style = ({ theme }: Props): {} => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: `${theme.spacing / 2}px ${theme.spacing * 1.3}px`,
    borderRadius: 2,
    width: "100%",
    minHeight: 40,
    cursor: "pointer",

    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.07)"
    },

    "&.SideNavigationItem_active": {
      backgroundColor: "rgba(0, 0, 0, 0.2)"
    },

    ":first-child": {
      marginTop: 0,
      marginBottom: theme.spacing ? theme.spacing * 2 : 16
    }
  })

export default glamorous(withTooltip(SideNavigationItem))(style)
