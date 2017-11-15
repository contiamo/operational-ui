import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"

import { hexOrColor, readableTextColor } from "contiamo-ui-utils"

import HeaderItem from "./HeaderItem"
import HeaderTitle from "./HeaderTitle"
import HeaderSeparator from "./HeaderSeparator"

export interface IProps {
  key?: string | number
  className?: string
  css?: any
  children: React.ReactNode
  theme?: Theme
  color?: string
}

const Container = glamorous.header(({ theme, color }: { theme: Theme; color?: string }): {} => {
  const { white } = theme.colors.palette
  const backgroundColor = color ? hexOrColor(color)(theme.colors.palette[color] || white) : white

  return {
    backgroundColor,
    display: "flex",
    flex: "0 0 50px",
    height: 50,
    alignItems: "center",
    padding: `${theme.spacing / 2}px ${theme.spacing}px`,
    color: readableTextColor(backgroundColor)(["black", "white"])
  }
})

const Header: React.SFC<IProps> = ({ key, className, css, children, color }) => (
  <Container key={key} css={css} className={className} color={color}>
    {children}
  </Container>
)

export default Header
export { HeaderItem, HeaderSeparator, HeaderTitle }
