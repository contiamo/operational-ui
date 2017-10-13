import * as React from "react"
import glamorous from "glamorous"

import { hexOrColor, readableTextColor } from "contiamo-ui-utils"

import HeaderItem from "./Item/HeaderItem"
import HeaderTitle from "./Title/HeaderTitle"
import HeaderSeparator from "./Separator/HeaderSeparator"

interface IProps {
  className?: string
  style?: any
  children: React.ReactNode
  theme?: Theme
  color: string
}

const Container = glamorous.header(({ theme, color }: { theme: Theme; color: string }): any => {
  const backgroundColor = color ? hexOrColor(color)(theme.colors.palette[color] || "white") : "white"

  return {
    backgroundColor,
    display: "flex",
    minHeight: 50,
    alignItems: "center",
    padding: `${theme.spacing / 2}px ${theme.spacing}px`,
    color: readableTextColor(backgroundColor)(["black", "white"])
  }
})

const Header: React.SFC<IProps> = ({ className, style, children, color }) => (
  <Container style={style} className={className} color={color}>
    {children}
  </Container>
)

export default Header
export { HeaderItem, HeaderSeparator, HeaderTitle }
