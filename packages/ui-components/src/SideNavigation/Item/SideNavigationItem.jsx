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
    justifyContent: "center",
    borderRadius: 2,
    cursor: "pointer",

    "&_has-tooltip + &_has-tooltip ": {
      marginTop: theme.spacing ? theme.spacing * 2 : 16
    },

    ":first-child": {
      marginTop: 0,
      marginBottom: theme.spacing ? theme.spacing * 2 : 16
    }
  })

export default glamorous(withTooltip(SideNavigationItem))(style)
