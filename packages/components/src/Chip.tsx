import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { darken, readableTextColor } from "@operational/utils"
import { Theme, expandColor } from "@operational/theme"

import Icon, { IconName } from "./Icon"
import { isWhite } from "./utils/color"

export interface Props {
  id?: string
  css?: {}
  color?: string
  onClick?: () => void
  onIconClick?: () => void
  className?: string
  children: React.ReactNode
  icon?: string | React.ReactNode
}

const Container = glamorous.div(({ theme, color, hasChip }: { theme: Theme; color?: string; hasChip: boolean }): {} => {
  const backgroundColor = expandColor(theme, color) || theme.colors.info
  const border = isWhite(backgroundColor) ? `1px solid ${theme.colors.lightGray}` : "0"

  return {
    backgroundColor,
    border,
    label: "chip",
    position: "relative",
    height: theme.spacing * 1.5,
    display: "inline-flex",
    alignItems: "center",
    boxSizing: "border-box",
    width: "fit-content",
    borderRadius: 2,
    cursor: "pointer",
    overflow: "hidden",
    color: readableTextColor(backgroundColor, ["black", "white"]),
    margin: `0px ${theme.spacing / 2}px 0px 0px`
  }
})

const Content = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  padding: `0px ${theme.spacing / 2}px`,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  }
}))

const Action = glamorous.div(({ theme, color }: { theme: Theme; color?: string }): {} => {
  const backgroundColor = expandColor(theme, color) || theme.colors.info
  const borderColor = isWhite(backgroundColor) ? theme.colors.lightGray : "rgba(255, 255, 255, 0.15)"
  return {
    borderLeft: `1px solid ${borderColor}`,
    color: readableTextColor(backgroundColor, ["black", "white"]),
    width: theme.spacing * 1.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)"
    }
  }
})

const Chip = (props: Props) => (
  <Container id={props.id} className={props.className} css={props.css} color={props.color} hasChip={!!props.onClick}>
    <Content onClick={props.onClick}>{props.children}</Content>
    {props.onIconClick && (
      <Action color={props.color} onClick={props.onIconClick}>
        {String(props.icon) === props.icon ? <Icon name={props.icon as IconName} size={12} /> : props.icon}
      </Action>
    )}
  </Container>
)

export default Chip
