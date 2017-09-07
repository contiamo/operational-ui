import * as React from "react"
import { SFC } from "react"
import glamorous from "glamorous"
import Theme from "types/theme"

import { hexOrColor, readableTextColor } from "contiamo-ui-utils"

import HeaderItem from "./Item/HeaderItem"
import HeaderTitle from "./Title/HeaderTitle"
import HeaderSeparator from "./Separator/HeaderSeparator"

type Props = { className: string, children: Node, theme: Theme, color: string }

const Header: SFC<Props> = ({ className, children }) =>
  <div className={className}>
    {children}
  </div>,
  style: {} = ({ theme, color }: Props) => {
    const backgroundColor = color ? hexOrColor(color)(theme.colors ? theme.colors[color] : "white") : "white"

    return {
      display: "flex",
      minHeight: 50,
      alignItems: "center",
      padding: `${theme.spacing / 2}px ${theme.spacing}px`,
      backgroundColor,
      color: readableTextColor(backgroundColor)(["black", "white"])
    }
  }

export default glamorous(Header)(style)
export { Header, HeaderItem, HeaderSeparator, HeaderTitle, style }
