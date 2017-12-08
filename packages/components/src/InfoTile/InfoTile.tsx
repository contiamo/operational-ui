import * as React from "react"
import * as ReactFeather from "react-feather"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { hexOrColor, readableTextColor, darken } from "@operational/utils"

import Icon from "../Icon/Icon"
import { ReactFeatherIconName } from "../Icon/ReactFeather"

export interface IProps {
  id?: string | number
  css?: any
  className?: string
  icon?: ReactFeatherIconName
  onAction?: () => void
  label?: string
  children: React.ReactNode
  color?: string
}

const Container = glamorous.div(
  {
    "&:not(:first-child)": {
      borderLeftWidth: 1,
      borderLeftStyle: "solid"
    }
  },
  ({
    theme,
    color,
    withIcon,
    withActionIcon
  }: {
    color?: string
    theme: Theme
    withIcon: boolean
    withActionIcon: boolean
  }): any => {
    const backgroundColor = color
      ? hexOrColor(color)((theme.colors && theme.colors.palette[color]) || "white")
      : "white"

    return {
      backgroundColor,
      position: "relative",
      display: "inline-flex",
      flexDirection: "column",
      width: "fit-content",
      borderColor: theme.colors.palette.grey30,
      padding: theme.spacing / 2,
      paddingLeft: withIcon ? theme.spacing + 20 : theme.spacing / 2,
      paddingRight: withActionIcon ? theme.spacing * 2.25 : theme.spacing / 2,
      color: readableTextColor(backgroundColor)(["black", "white"])
    }
  }
)

const Label = glamorous.small(({ color, theme }: { color?: string; theme: Theme }): any => {
  const backgroundColor = color ? hexOrColor(color)((theme.colors && theme.colors.palette[color]) || "white") : "white"
  return {
    ...theme.typography.small,
    marginBottom: 3,
    fontWeight: 600,
    color: readableTextColor(backgroundColor)([theme.colors.palette.grey60, theme.colors.palette.grey20])
  }
})

const IconContainer = glamorous.div(
  {
    width: 20,
    height: 20,
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)"
  },
  ({ theme, color }: { theme: Theme; color?: string }) => {
    const backgroundColor = color
      ? hexOrColor(color)((theme.colors && theme.colors.palette[color]) || "white")
      : "white"

    return {
      left: theme.spacing / 2,
      "& svg": {
        stroke: readableTextColor(backgroundColor)([theme.colors.palette.white, theme.colors.palette.black])
      }
    }
  }
)

const ActionIconContainer = glamorous.div(({ theme, color }: { theme: Theme; color: string }): {} => {
  const backgroundColor = color ? hexOrColor(color)((theme.colors && theme.colors.palette[color]) || "white") : "white"
  return {
    position: "absolute",
    width: theme.spacing * 1.5,
    height: theme.spacing * 1.5,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    right: 0,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.25)"
    },
    "& svg": {
      stroke: readableTextColor(backgroundColor)([theme.colors.palette.white, theme.colors.palette.black])
    }
  }
})

const InfoTile = (props: IProps) => (
  <Container
    key={props.id}
    css={props.css}
    className={props.className}
    withIcon={!!props.icon}
    withActionIcon={!!props.onAction}
    color={props.color}
  >
    {props.icon ? (
      <IconContainer color={props.color}>
        <Icon size={20} name={props.icon} />
      </IconContainer>
    ) : null}
    {props.onAction ? (
      <ActionIconContainer color={props.color} onClick={props.onAction}>
        <Icon name="MoreHorizontal" size={8} />
      </ActionIconContainer>
    ) : null}
    <Label color={props.color}>{props.label}</Label>
    <span>{props.children}</span>
  </Container>
)

export default InfoTile
