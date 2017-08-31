// @flow
import React from "react"
import type { Node } from "react"
import glamorous from "glamorous"

import { hexOrColor, readableTextColor, darken } from "contiamo-ui-utils"

type props = {
  className: string,
  children: Node,
  onClick?: any,
  theme?: THEME,
}

const SideNavigationLink = ({ className, children, onClick }: props): React$Element<*> =>
    <div className={className} onClick={onClick} role="button" tabIndex="-1">
      {children}
    </div>,
  style = ({ theme, color }: { theme: THEME, color?: string }): {} => {
    const backgroundColor = color ? hexOrColor(color)(theme.colors[color]) : theme.greys && theme.greys["100"]

    return {
      position: "relative",
      zIndex: (theme.baseZIndex || 0) + 1,
      margin: `0 ${theme.spacing * -0.5}px`,
      padding: `${theme.spacing}px`,
      minWidth: 200,
      borderRadius: 2,
      transition: ".1s background-color ease",
      backgroundColor,
      color: readableTextColor(backgroundColor)(["black", "white"]),

      "& + &": {
        borderTop: `1px solid ${theme.greys && theme.greys["100"]}`
      },

      ":hover": {
        backgroundColor: darken(backgroundColor)(10)
      },

      ":first-child": {
        marginTop: `${theme.spacing * -0.5}px`
      },

      ":last-child": {
        marginBottom: `${theme.spacing * -0.5}px`
      }
    }
  }

export default glamorous(SideNavigationLink)(style)
export { SideNavigationLink, style } // for testing.
