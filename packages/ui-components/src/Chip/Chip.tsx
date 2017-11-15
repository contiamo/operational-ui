import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

import { darken, hexOrColor, readableTextColor } from "contiamo-ui-utils"
import { Theme } from "contiamo-ui-theme"

export interface IProps {
  key?: string | number
  css?: any
  color?: string
  onClick?: () => void
  className?: string
  children: React.ReactNode
  symbol?: string
}

const Container = glamorous.div(
  ({ theme, color, hasChip }: { theme: Theme; color?: string; hasChip: boolean }): any => {
    const backgroundColor = hexOrColor(color)(theme.colors.palette[color] || theme.colors.palette.info)

    return {
      backgroundColor,
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "fit-content",
      borderRadius: 2,
      padding: hasChip
        ? `${theme.spacing / 3}px ${2.5 * theme.spacing}px ${theme.spacing / 3}px ${theme.spacing * 2 / 3}px`
        : `${theme.spacing / 3}px ${theme.spacing * 2 / 3}px`,
      cursor: "pointer",
      overflow: "hidden",
      color: readableTextColor(backgroundColor)(["black", "white"]),

      "& + .co_chip": {
        marginLeft: theme.spacing / 4
      }
    }
  }
)

const Action = glamorous.div(({ theme, color }: { theme: Theme; color?: string }): any => {
  const backgroundColor = hexOrColor(color)(theme.colors.palette[color] || theme.colors.palette.info)
  return {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
    color: readableTextColor(backgroundColor)(["black", "white"]),
    position: "absolute",
    width: theme.spacing * 1.75,
    top: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: `0 ${theme.spacing / 4}px`,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.25)"
    }
  }
})

const Chip: React.SFC<IProps> = ({ className, key, css, children, onClick, color, symbol }) => (
  <Container key={key} className={`${className || ""} co_chip`} css={css} color={color} hasChip={!!onClick}>
    {children}
    {onClick && (
      <Action color={color} onClick={onClick}>
        {symbol || "×"}
      </Action>
    )}
  </Container>
)

export default Chip
