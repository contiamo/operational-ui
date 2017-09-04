// @flow
import React from "react"
import type { Node } from "react"
import glamorous from "glamorous"

import { hexOrColor, readableTextColor, darken } from "contiamo-ui-utils"

type Modifier = "group" | "space"

type Props = {
  className?: string,
  onClick?: any,
  children?: any,
  modifiers: Array<Modifier>
}

const Button = ({ className = "", onClick, children, modifiers = [] }: Props): Node =>
    <div
      tabIndex="-1"
      role="button"
      className={`${className} Button${modifiers
        .map(mod => `${modifiers.length > 0 ? " " : ""}Button_${mod}`)
        .join(" ")}`}
      onClick={onClick}
    >
      {children}
    </div>,
  style = ({ theme, color, active }: { theme: THEME, color?: string, active?: boolean }): {} => {
    const backgroundColor: string = color ? hexOrColor(color)(theme.colors ? theme.colors[color] : "white") : "white",
      activeBackgroundColor: string = darken(backgroundColor)(5),
      textColor = readableTextColor(backgroundColor)(["black", "white"]),
      activeBoxShadow = "2px 2px 4px rgba(0, 0, 0, 0.14) inset"

    return {
      display: "inline-block",
      padding: theme.spacing ? theme.spacing / 2 : 8,
      border: "1px solid rgba(0, 0, 0, .2)",
      cursor: "pointer",
      boxShadow: active ? activeBoxShadow : "none",
      backgroundColor: active ? activeBackgroundColor : backgroundColor,
      color: textColor,

      ":hover": {
        backgroundColor: activeBackgroundColor,
        color: readableTextColor(activeBackgroundColor)(["white", "black"])
      },

      ":active": {
        boxShadow: activeBoxShadow
      },

      "&.Button_group": {
        marginLeft: -1
      },

      "&.Button_space": {
        marginLeft: theme.spacing ? theme.spacing / 2 : 8
      }
    }
  }

export default glamorous(Button)(style)
export { Button, style }
