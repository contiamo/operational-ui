import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { darken, hexOrColor, readableTextColor } from "@operational/utils"
import { Theme } from "@operational/theme"

import Icon, { IconName } from "./Icon"

export interface IProps {
  id?: string | number
  css?: {}
  color?: string
  onClick?: () => void
  onIconClick?: () => void
  className?: string
  children: React.ReactNode
  icon?: string | React.ReactNode
}

const Container = glamorous.div(({ theme, color, hasChip }: { theme: Theme; color?: string; hasChip: boolean }): {} => {
  const backgroundColor = hexOrColor(color)(theme.colors[color] || theme.colors.info)

  return {
    backgroundColor,
    label: "chip",
    position: "relative",
    height: 20,
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    borderRadius: 2,
    cursor: "pointer",
    overflow: "hidden",
    color: readableTextColor(backgroundColor)(["black", "white"]),
    margin: `${theme.spacing / 3}px ${theme.spacing / 3}px 0px 0px`
  }
})

const Content = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  display: "block",
  padding: theme.spacing / 2,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  }
}))

const Action = glamorous.div(({ theme, color }: { theme: Theme; color?: string }): {} => {
  const backgroundColor = hexOrColor(color)(theme.colors[color] || theme.colors.info)
  return {
    borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
    color: readableTextColor(backgroundColor)(["black", "white"]),
    width: theme.spacing * 1.75,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)"
    }
  }
})

const Chip = (props: IProps) => (
  <Container key={props.id} className={props.className} css={props.css} color={props.color} hasChip={!!props.onClick}>
    <Content onClick={props.onClick}>{props.children}</Content>
    {props.onIconClick && (
      <Action color={props.color} onClick={props.onIconClick}>
        {String(props.icon) === props.icon ? <Icon name={props.icon as IconName} size={12} /> : props.icon}
      </Action>
    )}
  </Container>
)

export default Chip
