import * as React from "react"
import glamorous from "glamorous"

import { darken, hexOrColor, readableTextColor } from "contiamo-ui-utils"

type Props = {
  theme?: Theme
  color?: string
  onClick?: () => void
  style?: {}
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
      padding: hasChip
        ? `${theme.spacing / 4}px ${3 * theme.spacing / 4}px ${theme.spacing / 4}px ${theme.spacing / 4}px`
        : theme.spacing / 4,
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
    backgroundColor: darken(backgroundColor)(-5),
    color: readableTextColor(backgroundColor)(["black", "white"]),
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: `0 ${theme.spacing / 4}px`,
    width: "fit-content",
    opacity: 0,
    zIndex: theme.baseZIndex + 100
  }
})

const Chip = ({ className, style, children, onClick, color, symbol }: Props) => (
  <Container className={`${className} co_chip`} style={style} color={color} hasChip={!!onClick}>
    {children}
    {onClick && (
      <Action tabIndex={-1} role="button" className="co_action" color={color} onClick={onClick}>
        {symbol || "x"}
      </Action>
    )}
  </Container>
)

export default Chip
