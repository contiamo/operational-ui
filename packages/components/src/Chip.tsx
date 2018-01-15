import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { darken, hexOrColor, readableTextColor } from "@operational/utils"
import { Theme } from "@operational/theme"

export interface IProps {
  id?: string | number
  css?: {}
  color?: string
  onClick?: () => void
  className?: string
  children: React.ReactNode
  symbol?: string
}

const Container = glamorous.div(({ theme, color, hasChip }: { theme: Theme; color?: string; hasChip: boolean }): {} => {
  const backgroundColor = hexOrColor(color)(theme.colors[color] || theme.colors.info)

  return {
    backgroundColor,
    label: "chip",
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    borderRadius: 2,
    padding: hasChip
      ? `${theme.spacing / 3}px ${theme.spacing * 8 / 3}px ${theme.spacing / 3}px ${theme.spacing}px`
      : `${theme.spacing / 3}px ${theme.spacing}px`,
    cursor: "pointer",
    overflow: "hidden",
    color: readableTextColor(backgroundColor)(["black", "white"]),
    margin: `${theme.spacing / 3}px ${theme.spacing / 3}px 0px 0px`
  }
})

const Action = glamorous.div(({ theme, color }: { theme: Theme; color?: string }): {} => {
  const backgroundColor = hexOrColor(color)(theme.colors[color] || theme.colors.info)
  return {
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
    padding: `0 ${theme.spacing / 3}px`,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)"
    }
  }
})

const Chip = (props: IProps) => (
  <Container key={props.id} className={props.className} css={props.css} color={props.color} hasChip={!!props.onClick}>
    {props.children}
    {props.onClick && (
      <Action color={props.color} onClick={props.onClick}>
        {props.symbol || "×"}
      </Action>
    )}
  </Container>
)

export default Chip
