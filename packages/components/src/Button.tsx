import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

import { hexOrColor, readableTextColor, darken } from "@operational/utils"
import { Theme } from "@operational/theme"

export interface IStyleProps {
  theme?: Theme
  color?: string
  active?: boolean
  disabled?: boolean
  condensed?: boolean
}

export interface IProps {
  id?: string | number
  css?: any
  className?: string
  onClick?: any
  type?: string
  children?: React.ReactNode
  color?: string
  active?: boolean
  disabled?: boolean
  condensed?: boolean
}

const Container = glamorous.div(({ theme, color, active, disabled, condensed }: IStyleProps): any => {
  const backgroundColor: string = color ? (hexOrColor(color)(theme.colors[color] || "white") as string) : "white"
  const activeBackgroundColor: string = darken(backgroundColor)(5)
  const textColor = readableTextColor(backgroundColor)([theme.colors.emphasizedText, "white"])
  const activeBoxShadow = theme.shadows.pressed
  const spacing = theme.spacing

  return {
    label: "button",
    display: "inline-block",
    padding: condensed ? `${spacing / 3}px ${spacing * 3 / 3}px` : `${spacing * 2 / 3}px ${spacing * 2}px`,
    borderRadius: 2,
    border: "1px solid",
    borderColor:
      ["white", "#FFF", "#fff"].indexOf(backgroundColor) > -1
        ? theme.colors.gray30
        : active ? activeBackgroundColor : backgroundColor,
    cursor: disabled ? "auto" : "pointer",
    boxShadow: active ? activeBoxShadow : "none",
    backgroundColor: active ? activeBackgroundColor : backgroundColor,

    color: textColor,
    opacity: disabled ? 0.6 : 1.0,
    outline: "none",

    ...!disabled
      ? {
          ":hover": {
            backgroundColor: activeBackgroundColor,
            color: readableTextColor(activeBackgroundColor)(["white", "#222"])
          },

          ":focus": {
            outline: 0,
            backgroundColor: activeBackgroundColor
          },

          ":active": {
            boxShadow: activeBoxShadow
          }
        }
      : {},

    marginRight: spacing / 2
  }
})

export default (props: IProps) => {
  return (
    <Container
      tabIndex={-1}
      role="button"
      type={props.type}
      key={props.id}
      css={props.css}
      className={props.className}
      onClick={props.onClick}
      color={props.color}
      active={props.active}
      disabled={props.disabled}
      condensed={props.condensed}
    >
      {props.children}
    </Container>
  )
}
