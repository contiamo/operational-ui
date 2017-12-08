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
  children?: React.ReactNode
  color?: string
  active?: boolean
  disabled?: boolean
  condensed?: boolean
}

const Container = glamorous.div(({ theme, color, active, disabled, condensed }: IStyleProps): any => {
  const backgroundColor: string = color
    ? (hexOrColor(color)(theme.colors.palette[color] || "white") as string)
    : "white"
  const activeBackgroundColor: string = darken(backgroundColor)(5)
  const textColor = readableTextColor(backgroundColor)([theme.colors.usage.emphasizedText, "white"])
  const activeBoxShadow = theme.shadows.pressed
  const spacing = theme.spacing

  return {
    display: "inline-block",
    padding: condensed ? `${spacing / 3}px ${spacing * 1 / 2}px` : `${spacing * 2 / 3}px ${spacing}px`,
    border: "1px solid rgba(0, 0, 0, .2)",
    borderRadius: 2,
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

const Button: React.SFC<IProps> = (props: IProps) => {
  return (
    <Container
      tabIndex={-1}
      role="button"
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

export default Button
